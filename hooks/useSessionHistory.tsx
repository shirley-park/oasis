import { create } from 'zustand'

export type Session = {
  startTime: number
  duration: number
  isSuccess?: boolean
}

type Sessions = Array<Session>

interface SessionHistoryState {
  sessions: Sessions
  addSession: (session: Session) => void
}

const mockData = [
  {
    startTime: 1685503115447,
    duration: 24,
    isSuccess: true,
  },
  {
    startTime: 1685503185447,
    duration: 15,
    isSuccess: false,
  },
]

export const useSessionHistory = create<SessionHistoryState>((set) => ({
  sessions: [...mockData],
  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
}))
