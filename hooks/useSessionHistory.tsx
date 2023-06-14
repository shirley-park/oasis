import { create } from 'zustand'
import { Tree } from './useTreeHistory'

export type SessionStatus = 'success' | 'fail'

export type Session = {
  startTime: number
  duration: number
  status: SessionStatus
  tree?: Tree
}

type Sessions = Array<Session>

interface SessionHistoryState {
  sessions: Sessions
  addSession: (session: Session) => void
}

// const mockData = [
//   {
//     startTime: 1685503115447,
//     duration: 24,
//     isSuccess: true,
//   },

//   {
//     startTime: 1685503186456,
//     duration: 15,
//     isSuccess: false,
//   },
// ]

export const useSessionHistory = create<SessionHistoryState>((set) => ({
  sessions: localStorage.getItem('sessionHistory')
    ? JSON.parse(localStorage.getItem('sessionHistory')!)
    : [],
  addSession: (session) =>
    set((state) => {
      const newState = [...state.sessions, session]
      localStorage.setItem('sessionHistory', JSON.stringify(newState))
      return { sessions: newState }
    }),
  completeSession: (startTime: number) =>
    // @ts-ignore
    set((state) => {
      const currentSession = state.sessions.find(
        (session) => session.startTime === startTime
      )
      if (!currentSession) return state
      const otherSessions = state.sessions.filter(
        (session) => session.startTime !== startTime
      )

      const completedSession = {
        ...currentSession,
        status: 'success',
      }

      return { sessions: [...otherSessions, completedSession] }
    }),
}))
