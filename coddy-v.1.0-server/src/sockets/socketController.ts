import { Server, Socket } from "socket.io";
import User, { ConversationState, IUser } from "../models/User";
import { CourseService } from "../services/CourseService";
import { ChatHistoryService } from "../services/ChatHistoryService";

// Interface payload pesan dari Client
interface ClientMessagePayload {
  userId?: string;
  sessionId?: string; // ID sesi chat dari frontend
  message: string;
}

export const setupSocketController = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`🔌 New Client Connected: ${socket.id}`);

    // --- 1. EVENT: CLIENT READY (Handshake Awal) ---
    // Dipanggil saat Front-End selesai loading untuk memicu sapaan bot
    socket.on("client_ready", async (data: { userId?: string }) => {
      try {
        let user: IUser | null = null;

        // Cek apakah ini user lama?
        if (data.userId) {
          user = await User.findById(data.userId);
        }

        // Jika User Tidak Ditemukan (User Baru) -> Buat Baru
        if (!user) {
          console.log("👤 Creating new user for Initial Greeting...");
          user = await User.create({
            name: "Guest Learner",
            currentState: ConversationState.ONBOARDING,
          });
          // Kirim ID baru ke Client
          socket.emit("session_established", { userId: user._id });
        }

        // LOGIKA SAPAAN PERTAMA (Proactive Bot)
        // Jika user masih tahap Onboarding
        // if (user.currentState === ConversationState.ONBOARDING) {
        //    socket.emit('server_message', {
        //      content: "Halo! 👋 Saya Coddy, asisten belajar codingmu. \n\nBoleh tahu siapa nama panggilanmu?",
        //      type: 'text'
        //    });
        // }
        // // Jika user sedang menunggu pilihan (mungkin refresh browser saat milih)
        // else if (user.currentState === ConversationState.AWAITING_CHOICE) {
        //    // Kirim ulang opsi path agar user bisa milih lagi
        //    const paths = await CourseService.getAllPaths();
        //    const pathOptions = paths.map((p: any) => p.learning_path_name);
        //    socket.emit('server_message', {
        //      content: `Hai ${user.name}, sepertinya kamu belum memilih jalur belajar. Silakan pilih di bawah ini:`,
        //      type: 'text',
        //      quickReplies: pathOptions
        //    });
        // }
        // // Jika user sudah pernah chat sebelumnya (IDLE)
        // else {
        //    // Tidak perlu menyapa ulang jika user hanya refresh,
        //    // kecuali user memang membuka sesi baru (bisa ditambahkan logic session check di sini)
        //    // Untuk sekarang kita diam saja agar chat history yang tampil di FE yang dominan
        // }
        console.log(`User ${user.name} is ready.`);
      } catch (error) {
        console.error("Error on client_ready:", error);
      }
    });

    // --- 2. EVENT: USER MENGIRIM PESAN ---
    socket.on("client_message", async (data: ClientMessagePayload) => {
      try {
        const { userId, message, sessionId } = data;
        let user: IUser | null = null;

        // Identifikasi User
        if (userId) user = await User.findById(userId);

        // Jika user belum ada (User Baru), buat User sementara
        if (!user) {
          console.log("👤 Creating new user session...");
          user = await User.create({
            name: "Guest Learner",
            currentState: ConversationState.ONBOARDING,
          });
          socket.emit("session_established", { userId: user._id });
        }

        // 1. SIMPAN PESAN USER KE DATABASE HISTORY
        if (sessionId) {
          await ChatHistoryService.addMessage(sessionId, "user", message);
        }

        // CHEAT CODE: Reset (Ketik "/reset" di chat untuk mengulang dari awal)
        if (message === "/reset") {
          user.currentState = ConversationState.ONBOARDING;
          user.name = "Guest Learner";
          // Reset preferences jika perlu
          user.preferences = {
            interestedPath: undefined,
            codingExperience: undefined,
          };
          await user.save();

          await sendAndSaveBotMessage(
            io,
            socket,
            sessionId,
            "🔄 State di-reset ke Onboarding. Silakan ketik nama Anda lagi."
          );
          return;
        }

        console.log(
          `📩 Message from ${user.name} [State: ${user.currentState}]: ${message}`
        );

        // ROUTING LOGIC BERDASARKAN STATE
        switch (user.currentState) {
          case ConversationState.ONBOARDING:
            await handleOnboardingState(io, socket, user, message, sessionId);
            break;

          case ConversationState.AWAITING_CHOICE:
            await handlePathSelection(io, socket, user, message, sessionId);
            break;

          case ConversationState.ASSESSMENT:
            // TODO: Panggil fungsi Assessment Handler
            await sendAndSaveBotMessage(
              io,
              socket,
              sessionId,
              "Fitur Assessment sedang dibangun..."
            );
            break;

          case ConversationState.IDLE:
            // TODO: Panggil ML Service (Langkah 3 nanti)
            await handleIdleState(io, socket, user, message, sessionId);
            break;

          default:
            // Fallback jika state error, kembalikan ke IDLE
            user.currentState = ConversationState.IDLE;
            await user.save();
            await sendAndSaveBotMessage(
              io,
              socket,
              sessionId,
              "System Error: Unknown State recovered."
            );
        }
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("error", { message: "Internal Server Error" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client Disconnected: ${socket.id}`);
    });
  });
};

// --- HELPER HANDLERS & UTILS ---

// Fungsi Helper untuk Kirim ke Socket DAN Simpan ke DB
async function sendAndSaveBotMessage(
  io: Server,
  socket: Socket,
  sessionId: string | undefined,
  content: string,
  quickReplies?: string[]
) {
  // 1. Simpan ke Database
  if (sessionId) {
    await ChatHistoryService.addMessage(sessionId, "bot", content);
  }

  // 2. Kirim ke Client
  socket.emit("server_message", {
    content,
    type: "text",
    quickReplies,
  });
}

async function handleOnboardingState(
  io: Server,
  socket: Socket,
  user: IUser,
  message: string,
  sessionId?: string
) {
  // Logic: User baru mengetik nama
  if (
    user.name === "Guest Learner" ||
    user.currentState === ConversationState.ONBOARDING
  ) {
    user.name = message;

    console.log("⏳ Mengambil data dari Supabase...");
    const paths = await CourseService.getAllPaths();

    // Mapping nama kolom yang benar sesuai CSV: 'learning_path_name'
    const pathOptions = paths.map((p: any) => p.learning_path_name);

    // UBAH STATE: Tunggu user memilih tombol
    user.currentState = ConversationState.AWAITING_CHOICE;
    await user.save();

    await sendAndSaveBotMessage(
      io,
      socket,
      sessionId,
      `Halo ${user.name}! Salam kenal. Pilih jalur belajar yang kamu minati:`,
      pathOptions
    );
  }
}

async function handlePathSelection(
  io: Server,
  socket: Socket,
  user: IUser,
  message: string,
  sessionId?: string
) {
  // 1. Simpan Pilihan ke Database
  user.preferences = {
    interestedPath: message,
    codingExperience: user.preferences?.codingExperience || "Not set",
  };

  // 2. Ubah status jadi IDLE (Selesai Onboarding)
  user.currentState = ConversationState.IDLE;
  await user.save();

  console.log(`✅ User ${user.name} memilih path: ${message}`);

  // 3. Beri respon konfirmasi
  await sendAndSaveBotMessage(
    io,
    socket,
    sessionId,
    `Pilihan bagus! Saya telah mencatat minat Anda di **${message}**. \n\nSekarang profil Anda sudah siap. Anda bisa bertanya apa saja tentang topik tersebut, atau ketik "Mulai" untuk melihat materi pertama.`
  );
}

async function handleIdleState(
  io: Server,
  socket: Socket,
  user: IUser,
  message: string,
  sessionId?: string
) {
  // Di sini nanti kita panggil API ML (Python)
  await sendAndSaveBotMessage(
    io,
    socket,
    sessionId,
    `Saya menerima pesan Anda: "${message}". (Menunggu integrasi ML...)`
  );
}
