// Common TypeScript interfaces for the application

export interface Course {
  id: number;
  title: string;
  short_description: string;
  description?: string;
  image_url?: string;
  path: string;
  level?: string;
  courseDuration?: number;
  courseDurationUnit?: string;
  class_length?: number;
  class_length_formatted?: string;
  teachers?: Teacher[];
  schedule?: CourseSchedule[];
  start_date?: string;
  end_date?: string;
  trending?: boolean;
  equipment?: string[];
  focus?: string;
  style?: string;
}

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  origin_country: string;
  image_url: string;
  bio: string;
  insta_tag: string;
  quote: string;
  path: string;
  featured_in: string[];
  courses: Course[];
  events?: Event[];
}

export interface CourseSchedule {
  id: number;
  course_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  short_description?: string;
  date?: string;
  location: string;
  image_url?: string;
  starts_at?: string;
  ends_at?: string;
  style?: string;
  focus?: string;
  equipment?: string[];
  path?: string;
  teachers?: Teacher[];
  most_liked?: boolean;
}
