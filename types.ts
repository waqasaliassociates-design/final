export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  enrolledDate?: string;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  priority: Priority;
  category?: string;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  isCompleted: boolean;
}

export interface Attendance {
  id: string;
  subject: string;
  totalClasses: number;
  attendedClasses: number;
}

export interface GPACourse {
  id: string;
  courseName: string;
  creditHours: number;
  grade: string; // 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  color: string; // CSS color class name
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  resetRequested: boolean;
}
