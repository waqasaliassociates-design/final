import { Task, Assignment, Attendance, GPACourse, Note, Reminder, User, AppSettings } from './types';

// Constants for LocalStorage keys
const KEYS = {
  USERS: 'student_planner_users',
  CURRENT_USER: 'student_planner_current_user',
  TASKS: 'student_planner_tasks',
  ASSIGNMENTS: 'student_planner_assignments',
  ATTENDANCE: 'student_planner_attendance',
  GPA_COURSES: 'student_planner_gpa_courses',
  NOTES: 'student_planner_notes',
  REMINDERS: 'student_planner_reminders',
  SETTINGS: 'student_planner_settings',
  IS_INITIALIZED: 'student_planner_is_initialized'
};

// Initial Mock Data to populate the app on first launch
const INITIAL_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Alex Mercer',
    email: 'waqasaliassociates@gmail.com',
    password: 'password123',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
    enrolledDate: '2025-09-01'
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'task_1',
    title: 'Review Calculus Chapter 4 Exercises',
    dueDate: new Date().toISOString().split('T')[0],
    isCompleted: false,
    priority: 'high',
    category: 'Homework'
  },
  {
    id: 'task_2',
    title: 'Set up Database Schema for Web Term Project',
    dueDate: new Date().toISOString().split('T')[0],
    isCompleted: true,
    priority: 'high',
    category: 'Project'
  },
  {
    id: 'task_3',
    title: 'Buy Physics Lab Notebook',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    isCompleted: false,
    priority: 'low',
    category: 'Shopping'
  },
  {
    id: 'task_4',
    title: 'Read Chapters 12 and 13 of History Textbook',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    isCompleted: false,
    priority: 'medium',
    category: 'Reading'
  },
  {
    id: 'task_5',
    title: 'Schedule Advisor Meeting',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    isCompleted: true,
    priority: 'medium',
    category: 'Admin'
  }
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign_1',
    subject: 'Data Structures',
    title: 'Binary Search Tree Implementation',
    description: 'Implement a fully functional BST with insert, delete, search, and tree traversal functions in C++.',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // 2 days from now
    priority: 'high',
    isCompleted: false
  },
  {
    id: 'assign_2',
    subject: 'Physics II',
    title: 'Electromagnetic Field Lab Report',
    description: 'Write a comprehensive report documenting the lab results on magnetic force and solenoid fields.',
    dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0], // 5 days from now
    priority: 'medium',
    isCompleted: false
  },
  {
    id: 'assign_3',
    subject: 'Linear Algebra',
    title: 'Eigenvalues and Eigenvectors Problem Set',
    description: 'Complete problems 1 through 15 on page 245 of the course text.',
    dueDate: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    priority: 'medium',
    isCompleted: true
  },
  {
    id: 'assign_4',
    subject: 'Literature',
    title: 'Analytical Essay Draft',
    description: 'Submit a 3-page draft exploring the themes of isolation and regret in Frankenstein.',
    dueDate: new Date(Date.now() + 691200000).toISOString().split('T')[0], // 8 days from now
    priority: 'low',
    isCompleted: false
  }
];

const INITIAL_ATTENDANCE: Attendance[] = [
  {
    id: 'att_1',
    subject: 'Algorithms & Data Structures',
    totalClasses: 24,
    attendedClasses: 22 // 91.6% - Green
  },
  {
    id: 'att_2',
    subject: 'General Physics II',
    totalClasses: 18,
    attendedClasses: 14 // 77.7% - Green
  },
  {
    id: 'att_3',
    subject: 'Linear Algebra',
    totalClasses: 20,
    attendedClasses: 13 // 65.0% - Yellow
  },
  {
    id: 'att_4',
    subject: 'Creative Writing',
    totalClasses: 12,
    attendedClasses: 7 // 58.3% - Red
  }
];

const INITIAL_GPA_COURSES: GPACourse[] = [
  { id: 'gpa_1', courseName: 'Introduction to Programming', creditHours: 4, grade: 'A' },
  { id: 'gpa_2', courseName: 'Calculus I', creditHours: 4, grade: 'A-' },
  { id: 'gpa_3', courseName: 'University Physics I', creditHours: 4, grade: 'B+' },
  { id: 'gpa_4', courseName: 'English Composition', creditHours: 3, grade: 'A' },
  { id: 'gpa_5', courseName: 'Introduction to Psychology', creditHours: 3, grade: 'B' }
];

const INITIAL_NOTES: Note[] = [
  {
    id: 'note_1',
    title: 'Git Essential Commands',
    content: 'git checkout -b <branch-name> (creates and switches)\ngit merge <branch> (merges branch to current)\ngit cherry-pick <commit> (applies specific commit)\ngit rebase -i HEAD~3 (interactive rebase for cleanup)',
    updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    color: 'bg-blue-50 border-blue-200 text-blue-900'
  },
  {
    id: 'note_2',
    title: 'Calculus - Derivative Formulas',
    content: 'd/dx (sin x) = cos x\nd/dx (cos x) = -sin x\nd/dx (tan x) = sec^2 x\nPower Rule: d/dx (x^n) = n * x^(n-1)\nProduct Rule: (uv)\' = u\'v + uv\'\nQuotient Rule: (u/v)\' = (u\'v - uv\') / v^2',
    updatedAt: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    color: 'bg-indigo-50 border-indigo-200 text-indigo-900'
  },
  {
    id: 'note_3',
    title: 'Project Presentation Checklist',
    content: '1. Prepare 10-slide deck focusing on problem and architecture\n2. Run database migration tests\n3. Record a 2-minute backup demo video in case of network issues\n4. Dress professionally and test microphone 15 mins before.',
    updatedAt: new Date(Date.now() - 259200000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    color: 'bg-amber-50 border-amber-200 text-amber-900'
  }
];

const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 'rem_1',
    title: 'Algorithms Midterm Exam',
    description: 'In-class midterm covering heaps, BSTs, sorting, and Big-O runtime analysis. Don\'t forget a calculator.',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days from now
    time: '09:00'
  },
  {
    id: 'rem_2',
    title: 'Submit Solenoid Lab File',
    description: 'Upload PDF lab report to the course portal before the midnight deadline.',
    date: new Date(Date.now() + 432000000).toISOString().split('T')[0], // 5 days from now
    time: '23:59'
  },
  {
    id: 'rem_3',
    title: 'Study Group Meeting',
    description: 'Meet Alex and Sarah at the university library, room 302, to review math homework.',
    date: new Date().toISOString().split('T')[0], // Today
    time: '15:30'
  }
];

const INITIAL_SETTINGS: AppSettings = {
  darkMode: false,
  notificationsEnabled: true,
  resetRequested: false
};

// Initialize Database if not already done
export const initializeDataStore = (force = false) => {
  if (force || !localStorage.getItem(KEYS.IS_INITIALIZED)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
    localStorage.setItem(KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
    localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
    localStorage.setItem(KEYS.GPA_COURSES, JSON.stringify(INITIAL_GPA_COURSES));
    localStorage.setItem(KEYS.NOTES, JSON.stringify(INITIAL_NOTES));
    localStorage.setItem(KEYS.REMINDERS, JSON.stringify(INITIAL_REMINDERS));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(KEYS.IS_INITIALIZED, 'true');
    return true;
  }
  return false;
};

// Generic helper methods for localStorage read/write
const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
};

const setLocalData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// --- DATA ACCESS METHODS ---

// USERS & AUTH
export const getUsers = (): User[] => getLocalData<User[]>(KEYS.USERS, INITIAL_USERS);
export const getCurrentUser = (): User | null => getLocalData<User | null>(KEYS.CURRENT_USER, null);

export const setCurrentUser = (user: User | null): void => {
  setLocalData<User | null>(KEYS.CURRENT_USER, user);
};

export const registerUser = (user: Omit<User, 'id'>): User | string => {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    return 'An account with this email already exists.';
  }
  const newUser: User = {
    ...user,
    id: `user_${Date.now()}`,
    avatarUrl: user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`,
    enrolledDate: new Date().toISOString().split('T')[0]
  };
  users.push(newUser);
  setLocalData<User[]>(KEYS.USERS, users);
  setCurrentUser(newUser);
  return newUser;
};

export const loginUser = (email: string, password: string): User | string => {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return 'Invalid email or password.';
  }
  setCurrentUser(user);
  return user;
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

export const updateProfile = (name: string, email: string): User | string => {
  const currentUser = getCurrentUser();
  if (!currentUser) return 'No user is logged in.';
  
  const users = getUsers();
  const index = users.findIndex(u => u.id === currentUser.id);
  
  if (index !== -1) {
    // Check email uniqueness if email changed
    if (email.toLowerCase() !== currentUser.email.toLowerCase() && 
        users.some(u => u.id !== currentUser.id && u.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists.';
    }
    
    const updatedUser = { ...currentUser, name, email };
    users[index] = updatedUser;
    setLocalData<User[]>(KEYS.USERS, users);
    setCurrentUser(updatedUser);
    return updatedUser;
  }
  return 'User not found.';
};

// TASKS
export const getTasks = (): Task[] => getLocalData<Task[]>(KEYS.TASKS, INITIAL_TASKS);
export const saveTasks = (tasks: Task[]): void => setLocalData<Task[]>(KEYS.TASKS, tasks);

export const addTask = (task: Omit<Task, 'id' | 'isCompleted'>): Task => {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: `task_${Date.now()}`,
    isCompleted: false
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  }
};

export const deleteTask = (id: string): void => {
  const tasks = getTasks();
  const filtered = tasks.filter(t => t.id !== id);
  saveTasks(filtered);
};

// ASSIGNMENTS
export const getAssignments = (): Assignment[] => getLocalData<Assignment[]>(KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
export const saveAssignments = (assignments: Assignment[]): void => setLocalData<Assignment[]>(KEYS.ASSIGNMENTS, assignments);

export const addAssignment = (assignment: Omit<Assignment, 'id' | 'isCompleted'>): Assignment => {
  const assignments = getAssignments();
  const newAssignment: Assignment = {
    ...assignment,
    id: `assign_${Date.now()}`,
    isCompleted: false
  };
  assignments.push(newAssignment);
  saveAssignments(assignments);
  return newAssignment;
};

export const updateAssignment = (updatedAssignment: Assignment): void => {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.id === updatedAssignment.id);
  if (index !== -1) {
    assignments[index] = updatedAssignment;
    saveAssignments(assignments);
  }
};

export const deleteAssignment = (id: string): void => {
  const assignments = getAssignments();
  const filtered = assignments.filter(a => a.id !== id);
  saveAssignments(filtered);
};

// ATTENDANCE
export const getAttendance = (): Attendance[] => getLocalData<Attendance[]>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
export const saveAttendance = (records: Attendance[]): void => setLocalData<Attendance[]>(KEYS.ATTENDANCE, records);

export const addAttendance = (record: Omit<Attendance, 'id'>): Attendance => {
  const records = getAttendance();
  const newRecord: Attendance = {
    ...record,
    id: `att_${Date.now()}`
  };
  records.push(newRecord);
  saveAttendance(records);
  return newRecord;
};

export const updateAttendance = (updatedRecord: Attendance): void => {
  const records = getAttendance();
  const index = records.findIndex(r => r.id === updatedRecord.id);
  if (index !== -1) {
    records[index] = updatedRecord;
    saveAttendance(records);
  }
};

export const deleteAttendance = (id: string): void => {
  const records = getAttendance();
  const filtered = records.filter(r => r.id !== id);
  saveAttendance(filtered);
};

// GPA CALCULATOR
export const getGPACourses = (): GPACourse[] => getLocalData<GPACourse[]>(KEYS.GPA_COURSES, INITIAL_GPA_COURSES);
export const saveGPACourses = (courses: GPACourse[]): void => setLocalData<GPACourse[]>(KEYS.GPA_COURSES, courses);

export const addGPACourse = (course: Omit<GPACourse, 'id'>): GPACourse => {
  const courses = getGPACourses();
  const newCourse: GPACourse = {
    ...course,
    id: `gpa_${Date.now()}`
  };
  courses.push(newCourse);
  saveGPACourses(courses);
  return newCourse;
};

export const updateGPACourse = (updatedCourse: GPACourse): void => {
  const courses = getGPACourses();
  const index = courses.findIndex(c => c.id === updatedCourse.id);
  if (index !== -1) {
    courses[index] = updatedCourse;
    saveGPACourses(courses);
  }
};

export const deleteGPACourse = (id: string): void => {
  const courses = getGPACourses();
  const filtered = courses.filter(c => c.id !== id);
  saveGPACourses(filtered);
};

// NOTES
export const getNotes = (): Note[] => getLocalData<Note[]>(KEYS.NOTES, INITIAL_NOTES);
export const saveNotes = (notes: Note[]): void => setLocalData<Note[]>(KEYS.NOTES, notes);

export const addNote = (note: Omit<Note, 'id' | 'updatedAt'>): Note => {
  const notes = getNotes();
  const newNote: Note = {
    ...note,
    id: `note_${Date.now()}`,
    updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
};

export const updateNote = (updatedNote: Omit<Note, 'updatedAt'>): void => {
  const notes = getNotes();
  const index = notes.findIndex(n => n.id === updatedNote.id);
  if (index !== -1) {
    notes[index] = {
      ...updatedNote,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    saveNotes(notes);
  }
};

export const deleteNote = (id: string): void => {
  const notes = getNotes();
  const filtered = notes.filter(n => n.id !== id);
  saveNotes(filtered);
};

// REMINDERS
export const getReminders = (): Reminder[] => getLocalData<Reminder[]>(KEYS.REMINDERS, INITIAL_REMINDERS);
export const saveReminders = (reminders: Reminder[]): void => setLocalData<Reminder[]>(KEYS.REMINDERS, reminders);

export const addReminder = (reminder: Omit<Reminder, 'id'>): Reminder => {
  const reminders = getReminders();
  const newReminder: Reminder = {
    ...reminder,
    id: `rem_${Date.now()}`
  };
  reminders.push(newReminder);
  saveReminders(reminders);
  return newReminder;
};

export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  saveReminders(filtered);
};

// SETTINGS
export const getSettings = (): AppSettings => getLocalData<AppSettings>(KEYS.SETTINGS, INITIAL_SETTINGS);
export const saveSettings = (settings: AppSettings): void => setLocalData<AppSettings>(KEYS.SETTINGS, settings);

// Helper to convert grade to GPA points
export const getGPAPoints = (grade: string): number => {
  switch (grade.toUpperCase()) {
    case 'A': return 4.0;
    case 'A-': return 3.7;
    case 'B+': return 3.3;
    case 'B': return 3.0;
    case 'B-': return 2.7;
    case 'C+': return 2.3;
    case 'C': return 2.0;
    case 'C-': return 1.7;
    case 'D': return 1.0;
    case 'F': return 0.0;
    default: return 0.0;
  }
};

// Helper to calculate GPA
export const calculateGPA = (courses: GPACourse[]): number => {
  if (courses.length === 0) return 0.0;
  let totalPoints = 0;
  let totalCredits = 0;
  courses.forEach(c => {
    totalPoints += getGPAPoints(c.grade) * c.creditHours;
    totalCredits += c.creditHours;
  });
  return totalCredits === 0 ? 0.0 : Math.round((totalPoints / totalCredits) * 100) / 100;
};
