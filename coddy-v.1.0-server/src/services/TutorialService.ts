import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// ... setup axios instance sama seperti CourseService ...
const API_URL = process.env.SUPABASE_URL;
const API_KEY = process.env.SUPABASE_KEY;

const supabaseClient = axios.create({
  baseURL: API_URL,
  headers: {
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const TutorialService = {
  getTutorialsByCourseId: async (courseId: string) => {
    try {
      // Asumsi kolom relasinya adalah 'course_id'
      const response = await supabaseClient.get(`/rest/v1/tutorials?course_id=eq.${courseId}&select=*`);
      return response.data;
    } catch (error) {
      return [];
    }
  }
};