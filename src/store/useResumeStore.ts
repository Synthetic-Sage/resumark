import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ResumeData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: string;
    photo: string;
  };
  work: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
    keywords: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    highlights: string[];
    url: string;
  }>;
}

const defaultResumeData: ResumeData = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: '',
    photo: '',
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
};

export interface ThemeColor {
  id: string;
  text: string;
  bg: string;
  border: string;
}

interface ResumeState {
  resumeData: ResumeData;
  activeTemplate: string;
  activeFont: string;
  activeColor: ThemeColor;
  updateBasics: (data: Partial<ResumeData['basics']>) => void;
  addWork: (work: Omit<ResumeData['work'][0], 'id'>) => void;
  updateWork: (id: string, work: Partial<ResumeData['work'][0]>) => void;
  removeWork: (id: string) => void;
  
  addEducation: (edu: Omit<ResumeData['education'][0], 'id'>) => void;
  updateEducation: (id: string, edu: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;

  addSkill: (skill: Omit<ResumeData['skills'][0], 'id'>) => void;
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;

  addProject: (project: Omit<ResumeData['projects'][0], 'id'>) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;

  setTemplate: (templateId: string) => void;
  setFont: (font: string) => void;
  setColor: (color: ThemeColor) => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      activeTemplate: 'ats-standard',
      activeFont: 'font-sans',
      activeColor: { id: 'slate', text: 'text-slate-900', bg: 'bg-slate-900', border: 'border-slate-900' },
      updateBasics: (data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basics: { ...state.resumeData.basics, ...data },
          },
        })),
      addWork: (work) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            work: [...state.resumeData.work, { ...work, id: crypto.randomUUID() }],
          },
        })),
      updateWork: (id, workData) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            work: state.resumeData.work.map((w) =>
              w.id === id ? { ...w, ...workData } : w
            ),
          },
        })),
      removeWork: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            work: state.resumeData.work.filter((w) => w.id !== id),
          },
        })),
        
      addEducation: (edu) =>
        set((state) => ({
          resumeData: { ...state.resumeData, education: [...state.resumeData.education, { ...edu, id: crypto.randomUUID() }] },
        })),
      updateEducation: (id, eduData) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((e) => (e.id === id ? { ...e, ...eduData } : e)),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          resumeData: { ...state.resumeData, education: state.resumeData.education.filter((e) => e.id !== id) },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills: [...state.resumeData.skills, { ...skill, id: crypto.randomUUID() }] },
        })),
      updateSkill: (id, skillData) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) => (s.id === id ? { ...s, ...skillData } : s)),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills: state.resumeData.skills.filter((s) => s.id !== id) },
        })),

      addProject: (proj) =>
        set((state) => ({
          resumeData: { ...state.resumeData, projects: [...state.resumeData.projects, { ...proj, id: crypto.randomUUID() }] },
        })),
      updateProject: (id, projData) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((p) => (p.id === id ? { ...p, ...projData } : p)),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          resumeData: { ...state.resumeData, projects: state.resumeData.projects.filter((p) => p.id !== id) },
        })),

      setTemplate: (templateId) => set({ activeTemplate: templateId }),
      setFont: (font) => set({ activeFont: font }),
      setColor: (color) => set({ activeColor: color }),
    }),
    {
      name: 'resumark-storage-v2', // Key for localStorage
    }
  )
);
