
import React, { createContext, useContext, useState, useEffect } from 'react';
import { studentAccounts } from '../data/accounts';

export interface Student {
  username: string;
  password: string;
  nama: string;
  kelas: string;
  nisn: string;
}

export interface Teacher {
  username: string;
  password: string;
  nama: string;
  nip: string;
  spesialisasi: string;
}

export interface CounselingRequest {
  id: string;
  studentUsername: string;
  studentName: string;
  studentClass: string;
  serviceType: string;
  description: string;
  priority: string;
  preferredDate: string;
  preferredTime: string;
  status: 'menunggu' | 'disetujui' | 'ditolak' | 'selesai';
  createdAt: string;
  approvedAt?: string;
  completedAt?: string;
  teacherNotes?: string;
}

export interface CounselingSession {
  id: string;
  requestId: string;
  studentUsername: string;
  studentName: string;
  studentClass: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'dijadwalkan' | 'berlangsung' | 'selesai';
  notes?: string;
  progress?: string;
}

interface AppContextType {
  currentUser: (Student | Teacher) | null;
  userRole: 'siswa' | 'guru' | null;
  isLoggedIn: boolean;
  counselingRequests: CounselingRequest[];
  counselingSessions: CounselingSession[];
  students: Student[];
  login: (user: Student | Teacher, role: 'siswa' | 'guru') => void;
  logout: () => void;
  addCounselingRequest: (request: Omit<CounselingRequest, 'id' | 'createdAt'>) => void;
  updateRequestStatus: (requestId: string, status: CounselingRequest['status'], teacherNotes?: string) => void;
  addCounselingSession: (session: Omit<CounselingSession, 'id'>) => void;
  updateSession: (sessionId: string, updates: Partial<CounselingSession>) => void;
  addStudent: (student: Student) => void;
  updateStudent: (username: string, updates: Partial<Student>) => void;
  deleteStudent: (username: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<(Student | Teacher) | null>(null);
  const [userRole, setUserRole] = useState<'siswa' | 'guru' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [counselingRequests, setCounselingRequests] = useState<CounselingRequest[]>([]);
  const [counselingSessions, setCounselingSessions] = useState<CounselingSession[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('userRole');
    const savedRequests = localStorage.getItem('counselingRequests');
    const savedSessions = localStorage.getItem('counselingSessions');
    const savedStudents = localStorage.getItem('students');

    if (savedUser && savedRole) {
      setCurrentUser(JSON.parse(savedUser));
      setUserRole(savedRole as 'siswa' | 'guru');
      setIsLoggedIn(true);
    }

    if (savedRequests) {
      setCounselingRequests(JSON.parse(savedRequests));
    }

    if (savedSessions) {
      setCounselingSessions(JSON.parse(savedSessions));
    }

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      // Initialize with default students from accounts.ts
      setStudents(studentAccounts);
      localStorage.setItem('students', JSON.stringify(studentAccounts));
    }
  }, []);

  const login = (user: Student | Teacher, role: 'siswa' | 'guru') => {
    setCurrentUser(user);
    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  };

  const addCounselingRequest = (request: Omit<CounselingRequest, 'id' | 'createdAt'>) => {
    const newRequest: CounselingRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedRequests = [...counselingRequests, newRequest];
    setCounselingRequests(updatedRequests);
    localStorage.setItem('counselingRequests', JSON.stringify(updatedRequests));
  };

  const updateRequestStatus = (requestId: string, status: CounselingRequest['status'], teacherNotes?: string) => {
    const updatedRequests = counselingRequests.map(req => {
      if (req.id === requestId) {
        const updates: Partial<CounselingRequest> = { status };
        if (status === 'disetujui') {
          updates.approvedAt = new Date().toISOString();
        }
        if (status === 'selesai') {
          updates.completedAt = new Date().toISOString();
        }
        if (teacherNotes) {
          updates.teacherNotes = teacherNotes;
        }
        return { ...req, ...updates };
      }
      return req;
    });
    setCounselingRequests(updatedRequests);
    localStorage.setItem('counselingRequests', JSON.stringify(updatedRequests));

    // Create session when request is approved
    if (status === 'disetujui') {
      const request = counselingRequests.find(req => req.id === requestId);
      if (request) {
        const newSession: CounselingSession = {
          id: Date.now().toString(),
          requestId: request.id,
          studentUsername: request.studentUsername,
          studentName: request.studentName,
          studentClass: request.studentClass,
          serviceType: request.serviceType,
          scheduledDate: request.preferredDate,
          scheduledTime: request.preferredTime,
          status: 'dijadwalkan',
        };
        addCounselingSession(newSession);
      }
    }
  };

  const addCounselingSession = (session: Omit<CounselingSession, 'id'>) => {
    const newSession: CounselingSession = {
      ...session,
      id: Date.now().toString(),
    };
    const updatedSessions = [...counselingSessions, newSession];
    setCounselingSessions(updatedSessions);
    localStorage.setItem('counselingSessions', JSON.stringify(updatedSessions));
  };

  const updateSession = (sessionId: string, updates: Partial<CounselingSession>) => {
    const updatedSessions = counselingSessions.map(session =>
      session.id === sessionId ? { ...session, ...updates } : session
    );
    setCounselingSessions(updatedSessions);
    localStorage.setItem('counselingSessions', JSON.stringify(updatedSessions));
  };

  const addStudent = (student: Student) => {
    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const updateStudent = (username: string, updates: Partial<Student>) => {
    const updatedStudents = students.map(student =>
      student.username === username ? { ...student, ...updates } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const deleteStudent = (username: string) => {
    const updatedStudents = students.filter(student => student.username !== username);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      userRole,
      isLoggedIn,
      counselingRequests,
      counselingSessions,
      students,
      login,
      logout,
      addCounselingRequest,
      updateRequestStatus,
      addCounselingSession,
      updateSession,
      addStudent,
      updateStudent,
      deleteStudent,
    }}>
      {children}
    </AppContext.Provider>
  );
};
