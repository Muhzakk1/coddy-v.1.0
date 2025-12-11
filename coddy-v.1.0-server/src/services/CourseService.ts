import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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

export interface LearningPath {
  learning_path_id: string;
  learning_path_name: string;
}

export interface Course {
  course_id: string;
  learning_path_id: string;
  course_name: string;
  course_level_str: string; // "1", "2", "3", "4"
  hours_to_study: number;
}

export const CourseService = {
  // 1. Ambil Semua Path (Sudah ada, pastikan seperti ini)
  getAllPaths: async () => {
    try {
      const response = await supabaseClient.get('/rest/v1/learning_paths?select=*');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // 2. LOGIKA BARU: Ambil Roadmap berdasarkan ID Path
  getRoadmapById: async (pathId: string) => {
    try {
      // Ambil Info Path
      const pathResponse = await supabaseClient.get(`/rest/v1/learning_paths?learning_path_id=eq.${pathId}&select=*`);
      if (pathResponse.data.length === 0) return null;
      
      const pathInfo = pathResponse.data[0];

      // Ambil Course & Level
      const coursesResponse = await supabaseClient.get(`/rest/v1/courses?learning_path_id=eq.${pathId}&select=*&order=course_level_str.asc`);
      const courses = coursesResponse.data;

      return {
        pathName: pathInfo.learning_path_name,
        pathId: pathInfo.learning_path_id,
        courses: courses,
        stats: {
          totalCourses: courses.length,
          totalHours: courses.reduce((acc: any, curr: any) => acc + curr.hours_to_study, 0)
        }
      };
    } catch (error) {
      console.error('❌ Error generating roadmap:', error);
      return null;
    }
  }
};