import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, CheckSquare, BookOpen, Percent, Award, FileText, Calendar, 
  BellRing, Search, User as UserIcon, Settings, LogOut, Home, Menu, X, ArrowUpRight
} from 'lucide-react';
import { 
  initializeDataStore, getCurrentUser, getTasks, saveTasks, getAssignments, 
  saveAssignments, getAttendance, saveAttendance, getGPACourses, saveGPACourses, 
  getNotes, saveNotes, getReminders, saveReminders, getSettings, saveSettings, logoutUser 
} from './dataStore';
import { Task, Assignment, Attendance, GPACourse, Note, Reminder, User, AppSettings } from './types';
import { AuthScreens } from './screens/AuthScreens';
import DashboardScreen from './screens/DashboardScreen';
import TaskManagerScreen from './screens/TaskManagerScreen';
import AssignmentScreen from './screens/AssignmentScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import GPAScreen from './screens/GPAScreen';
import NotesScreen from './screens/NotesScreen';
import CalendarScreen from './screens/CalendarScreen';
import RemindersScreen from './screens/RemindersScreen';
import ProfileSettingsScreens from './screens/ProfileSettingsScreens';
import GlobalSearchScreen from './screens/GlobalSearchScreen';
import Modal from './components/Modal';
import { motion, AnimatePresence } from 'motion/react';

type ScreenType = 
  | 'splash' | 'login' | 'register' | 'dashboard' | 'tasks' | 'assignments' 
  | 'attendance' | 'gpa' | 'notes' | 'calendar' | 'reminders' | 'profile' 
  | 'settings' | 'search';

export default function App() {
  // Authentication & Layout States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [subSection, setSubSection] = useState<'profile' | 'settings' | 'statistics'>('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Database Data States
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [gpaCourses, setGpaCourses] = useState<GPACourse[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appSettings, setAppSettings] = useState<AppSettings>({ darkMode: false, notificationsEnabled: true, resetRequested: false });

  // Direct open state flags for Quick Actions
  const [taskAddDirect, setTaskAddDirect] = useState(false);
  const [assignAddDirect, setAssignAddDirect] = useState(false);
  const [noteAddDirect, setNoteAddDirect] = useState(false);
  const [attAddDirect, setAttAddDirect] = useState(false);

  // Search redirection popover modal details
  const [searchSelectedTask, setSearchSelectedTask] = useState<Task | null>(null);
  const [searchSelectedAssign, setSearchSelectedAssign] = useState<Assignment | null>(null);
  const [searchSelectedNote, setSearchSelectedNote] = useState<Note | null>(null);

  // Initialize and load data from local store
  useEffect(() => {
    initializeDataStore();
    const loggedUser = getCurrentUser();
    if (loggedUser) {
      setCurrentUser(loggedUser);
      setCurrentScreen('dashboard');
    }
    
    // Load app datasets
    setTasks(getTasks());
    setAssignments(getAssignments());
    setAttendance(getAttendance());
    setGpaCourses(getGPACourses());
    setNotes(getNotes());
    setReminders(getReminders());
    
    const savedSettings = getSettings();
    setAppSettings(savedSettings);

    // Apply dark mode immediately if active
    if (savedSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync data updates to local storage
  const handleAddTask = (t: Omit<Task, 'id' | 'isCompleted'>) => {
    const list = getTasks();
    const newItem: Task = { ...t, id: `task_${Date.now()}`, isCompleted: false };
    list.push(newItem);
    saveTasks(list);
    setTasks(list);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const list = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    saveTasks(list);
    setTasks(list);
  };

  const handleDeleteTask = (id: string) => {
    const list = tasks.filter(t => t.id !== id);
    saveTasks(list);
    setTasks(list);
  };

  const handleAddAssignment = (a: Omit<Assignment, 'id' | 'isCompleted'>) => {
    const list = getAssignments();
    const newItem: Assignment = { ...a, id: `assign_${Date.now()}`, isCompleted: false };
    list.push(newItem);
    saveAssignments(list);
    setAssignments(list);
  };

  const handleUpdateAssignment = (updatedAssign: Assignment) => {
    const list = assignments.map(a => a.id === updatedAssign.id ? updatedAssign : a);
    saveAssignments(list);
    setAssignments(list);
  };

  const handleDeleteAssignment = (id: string) => {
    const list = assignments.filter(a => a.id !== id);
    saveAssignments(list);
    setAssignments(list);
  };

  const handleAddAttendance = (record: Omit<Attendance, 'id'>) => {
    const list = getAttendance();
    const newItem: Attendance = { ...record, id: `att_${Date.now()}` };
    list.push(newItem);
    saveAttendance(list);
    setAttendance(list);
  };

  const handleUpdateAttendance = (updatedRecord: Attendance) => {
    const list = attendance.map(a => a.id === updatedRecord.id ? updatedRecord : a);
    saveAttendance(list);
    setAttendance(list);
  };

  const handleDeleteAttendance = (id: string) => {
    const list = attendance.filter(a => a.id !== id);
    saveAttendance(list);
    setAttendance(list);
  };

  const handleAddCourse = (course: Omit<GPACourse, 'id'>) => {
    const list = getGPACourses();
    const newItem: GPACourse = { ...course, id: `gpa_${Date.now()}` };
    list.push(newItem);
    saveGPACourses(list);
    setGpaCourses(list);
  };

  const handleUpdateCourse = (updatedCourse: GPACourse) => {
    const list = gpaCourses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    saveGPACourses(list);
    setGpaCourses(list);
  };

  const handleDeleteCourse = (id: string) => {
    const list = gpaCourses.filter(c => c.id !== id);
    saveGPACourses(list);
    setGpaCourses(list);
  };

  const handleAddNote = (n: Omit<Note, 'id' | 'updatedAt'>) => {
    const list = getNotes();
    const newItem: Note = { 
      ...n, 
      id: `note_${Date.now()}`, 
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    };
    list.push(newItem);
    saveNotes(list);
    setNotes(list);
  };

  const handleUpdateNote = (updatedNote: Omit<Note, 'updatedAt'>) => {
    const list = notes.map(n => n.id === updatedNote.id ? {
      ...updatedNote,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } : n);
    saveNotes(list);
    setNotes(list);
  };

  const handleDeleteNote = (id: string) => {
    const list = notes.filter(n => n.id !== id);
    saveNotes(list);
    setNotes(list);
  };

  const handleAddReminder = (r: Omit<Reminder, 'id'>) => {
    const list = getReminders();
    const newItem: Reminder = { ...r, id: `rem_${Date.now()}` };
    list.push(newItem);
    saveReminders(list);
    setReminders(list);
  };

  const handleDeleteReminder = (id: string) => {
    const list = reminders.filter(r => r.id !== id);
    saveReminders(list);
    setReminders(list);
  };

  const handleUpdateSettings = (settings: AppSettings) => {
    saveSettings(settings);
    setAppSettings(settings);
  };

  // Factory reset database
  const handleResetData = () => {
    initializeDataStore(true);
    setTasks(getTasks());
    setAssignments(getAssignments());
    setAttendance(getAttendance());
    setGpaCourses(getGPACourses());
    setNotes(getNotes());
    setReminders(getReminders());
    const savedSettings = getSettings();
    setAppSettings(savedSettings);
    document.documentElement.classList.remove('dark');
  };

  // Auth Callbacks
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  // Quick Action Routing from Dashboard
  const handleQuickAction = (action: string) => {
    if (action === 'add_task') {
      setTaskAddDirect(true);
      setCurrentScreen('tasks');
    } else if (action === 'add_assignment') {
      setAssignAddDirect(true);
      setCurrentScreen('assignments');
    } else if (action === 'add_note') {
      setNoteAddDirect(true);
      setCurrentScreen('notes');
    } else if (action === 'add_attendance') {
      setAttAddDirect(true);
      setCurrentScreen('attendance');
    }
  };

  // Global search redirection click actions
  const handleSearchOpenTask = (task: Task) => {
    setSearchSelectedTask(task);
  };

  const handleSearchOpenAssign = (assign: Assignment) => {
    setSearchSelectedAssign(assign);
  };

  const handleSearchOpenNote = (note: Note) => {
    setSearchSelectedNote(note);
  };

  // Sidebar/Bottom bar elements mapping
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Percent },
    { id: 'gpa', label: 'GPA', icon: Award },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reminders', label: 'Reminders', icon: BellRing }
  ];

  // Screen routing render switch
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            user={currentUser || { name: 'Student' }}
            tasks={tasks}
            assignments={assignments}
            attendance={attendance}
            reminders={reminders}
            onQuickAction={handleQuickAction}
            navigate={(screen) => setCurrentScreen(screen)}
          />
        );
      case 'tasks':
        return (
          <TaskManagerScreen
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            isOpenAddDirectly={taskAddDirect}
            onCloseAddDirectly={() => setTaskAddDirect(false)}
          />
        );
      case 'assignments':
        return (
          <AssignmentScreen
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onUpdateAssignment={handleUpdateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            isOpenAddDirectly={assignAddDirect}
            onCloseAddDirectly={() => setAssignAddDirect(false)}
          />
        );
      case 'attendance':
        return (
          <AttendanceScreen
            attendance={attendance}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendance={handleUpdateAttendance}
            onDeleteAttendance={handleDeleteAttendance}
            isOpenAddDirectly={attAddDirect}
            onCloseAddDirectly={() => setAttAddDirect(false)}
          />
        );
      case 'gpa':
        return (
          <GPAScreen
            courses={gpaCourses}
            onAddCourse={handleAddCourse}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        );
      case 'notes':
        return (
          <NotesScreen
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            isOpenAddDirectly={noteAddDirect}
            onCloseAddDirectly={() => setNoteAddDirect(false)}
          />
        );
      case 'calendar':
        return (
          <CalendarScreen
            tasks={tasks}
            assignments={assignments}
            reminders={reminders}
          />
        );
      case 'reminders':
        return (
          <RemindersScreen
            reminders={reminders}
            onAddReminder={handleAddReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        );
      case 'profile':
      case 'settings':
        return (
          <ProfileSettingsScreens
            user={currentUser || { id: 'u1', name: 'Alex Mercer', email: 'alex@university.edu' }}
            settings={appSettings}
            tasks={tasks}
            assignments={assignments}
            attendance={attendance}
            onUpdateUser={(updated) => setCurrentUser(updated)}
            onUpdateSettings={handleUpdateSettings}
            onResetData={handleResetData}
            onLogout={handleLogout}
            activeSubSection={subSection}
            setSubSection={setSubSection}
          />
        );
      case 'search':
        return (
          <GlobalSearchScreen
            tasks={tasks}
            assignments={assignments}
            notes={notes}
            onOpenTask={handleSearchOpenTask}
            onOpenAssignment={handleSearchOpenAssign}
            onOpenNote={handleSearchOpenNote}
          />
        );
      default:
        return <div>Screen not found.</div>;
    }
  };

  // If not logged in, render authentication screens directly
  if (!currentUser) {
    return (
      <AuthScreens
        onAuthSuccess={handleAuthSuccess}
        activeScreen={currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'register' ? currentScreen : 'login'}
        navigate={(screen) => setCurrentScreen(screen)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      
      {/* 1. DESKTOP VIEW: PERSISTENT SIDE NAVIGATION RAIL */}
      <aside className="w-64 bg-brand-card-light dark:bg-brand-card-dark border-r border-brand-border-light dark:border-brand-border-dark hidden md:flex flex-col justify-between sticky top-0 h-screen z-20">
        <div className="flex-1 flex flex-col pt-6 overflow-y-auto">
          {/* Logo Branding */}
          <div className="px-6 flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-primary/15">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-extrabold font-display tracking-tight text-slate-900 dark:text-white block">STUDENT PLANNER</span>
              <span className="text-[10px] font-bold text-brand-primary dark:text-brand-light tracking-wider uppercase">Professional</span>
            </div>
          </div>

          {/* Nav Elements */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id as ScreenType);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-text-secondary hover:text-slate-900 hover:bg-brand-bg-light dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-brand-bg-dark/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Bottom Footer: User Badge */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80'} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/10"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-gray-900 dark:text-white block truncate">{currentUser.name}</span>
              <span className="text-[10px] text-gray-400 block truncate">{currentUser.email}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSubSection('profile');
                setCurrentScreen('profile');
              }}
              className="py-1.5 px-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-bold text-center cursor-pointer border border-gray-100 dark:border-slate-700"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setSubSection('settings');
                setCurrentScreen('settings');
              }}
              className="py-1.5 px-3 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-bold text-center cursor-pointer border border-gray-100 dark:border-slate-700"
            >
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE VIEW: TOP BAR & BOTTOM NAVIGATION PORTAL */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Mobile/Tablet Header */}
        <header className="sticky top-0 z-30 bg-brand-card-light/80 dark:bg-brand-card-dark/80 backdrop-blur-md border-b border-brand-border-light dark:border-brand-border-dark flex items-center justify-between px-4 py-3.5 md:px-8">
          <div className="flex items-center gap-3">
            {/* Left Brand Badge */}
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white md:hidden">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-lg md:text-xl font-extrabold font-display text-slate-900 dark:text-white capitalize">
              {currentScreen === 'gpa' ? 'GPA Calculator' : currentScreen === 'search' ? 'Search Console' : currentScreen}
            </h1>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('search')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                currentScreen === 'search'
                  ? 'bg-brand-light dark:bg-brand-primary/35 text-brand-primary'
                  : 'hover:bg-brand-bg-light dark:hover:bg-brand-bg-dark text-slate-500'
              }`}
              title="Search console"
            >
              <Search className="w-5 h-5" />
            </button>

            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              onClick={() => {
                setSubSection('profile');
                setCurrentScreen('profile');
              }}
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500/10 cursor-pointer hover:border-blue-500 transition-colors"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Content Stages */}
        <main className="flex-1 pb-24 md:pb-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* MOBILE VIEW: PERSISTENT BOTTOM NAVIGATION TAB BAR */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-card-light/90 dark:bg-brand-card-dark/90 backdrop-blur-lg border-t border-brand-border-light dark:border-brand-border-dark px-2 py-2 flex md:hidden items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as ScreenType)}
                className="flex flex-col items-center justify-center p-1.5 min-w-[50px] relative cursor-pointer"
              >
                {/* Visual Active M3 Pill highlight */}
                <span className={`px-4 py-1.5 rounded-full mb-1 transition-all ${
                  isActive ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-light scale-105' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`text-[9px] font-bold tracking-tight transition-colors ${
                  isActive ? 'text-brand-primary dark:text-brand-light' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
          {/* Calendar shortlink at end of mobile view */}
          <button
            onClick={() => setCurrentScreen('calendar')}
            className="flex flex-col items-center justify-center p-1.5 min-w-[50px] relative cursor-pointer"
          >
            <span className={`px-4 py-1.5 rounded-full mb-1 transition-all ${
              currentScreen === 'calendar' ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-light scale-105' : 'text-slate-400 dark:text-slate-500'
            }`}>
              <Calendar className="w-5 h-5" />
            </span>
            <span className={`text-[9px] font-bold tracking-tight transition-colors ${
              currentScreen === 'calendar' ? 'text-brand-primary' : 'text-slate-400'
            }`}>
              Calendar
            </span>
          </button>
        </nav>
      </div>

      {/* -------------------------------------------------------------
          GLOBAL SEARCH CLICK REDIRECTION DETAIL MODALS
         ------------------------------------------------------------- */}

      {/* 1. Global Searched Task detail */}
      <Modal isOpen={searchSelectedTask !== null} onClose={() => setSearchSelectedTask(null)} title="Task Standing">
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full uppercase tracking-wider">
              {searchSelectedTask?.category || 'Task'}
            </span>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full uppercase">
              {searchSelectedTask?.priority} Priority
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
            {searchSelectedTask?.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Due on <span className="font-semibold text-gray-700 dark:text-gray-300">{searchSelectedTask?.dueDate}</span></span>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => {
                setSearchSelectedTask(null);
                setCurrentScreen('tasks');
              }}
              className="px-5 py-2.5 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center gap-1.5"
            >
              <span>Manage on Board</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

      {/* 2. Global Searched Assignment detail */}
      <Modal isOpen={searchSelectedAssign !== null} onClose={() => setSearchSelectedAssign(null)} title="Assignment Details">
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full uppercase tracking-wider">
              {searchSelectedAssign?.subject}
            </span>
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full uppercase">
              {searchSelectedAssign?.priority} Priority
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
            {searchSelectedAssign?.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Due on <span className="font-semibold text-gray-700 dark:text-gray-300">{searchSelectedAssign?.dueDate}</span></span>
          </div>

          <div className="bg-gray-50 dark:bg-slate-800/80 p-4 rounded-xl border border-gray-100/50 dark:border-slate-700">
            <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {searchSelectedAssign?.description || 'No detailed specifications logged.'}
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => {
                setSearchSelectedAssign(null);
                setCurrentScreen('assignments');
              }}
              className="px-5 py-2.5 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center gap-1.5"
            >
              <span>View in Assignments</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

      {/* 3. Global Searched Note detail */}
      <Modal isOpen={searchSelectedNote !== null} onClose={() => setSearchSelectedNote(null)} title="Class Note Preview">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-1.5 text-xs text-gray-450 dark:text-gray-500 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>Revised {searchSelectedNote?.updatedAt}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
            {searchSelectedNote?.title}
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-gray-100 dark:border-slate-700 max-h-[40vh] overflow-y-auto">
            <p className="text-xs sm:text-sm text-gray-750 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {searchSelectedNote?.content}
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => {
                setSearchSelectedNote(null);
                setCurrentScreen('notes');
              }}
              className="px-5 py-2.5 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center gap-1.5"
            >
              <span>Edit Note Book</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
