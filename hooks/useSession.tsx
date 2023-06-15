import { useCallback, useEffect, useState } from 'react'
import { SessionStatus } from './useSessionHistory'

export const useSession = () => {
  const [startTime, setStartTime] = useState<number | undefined>()
  const [duration, setDuration] = useState<number | undefined>()

  const [status, setStatus] = useState<SessionStatus | undefined>()

  const clearSession = () => {
    setStartTime(undefined)
    setDuration(undefined)
  }

  const startSession = (duration: number) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const now = Date.now()
      setStartTime(now)
      setDuration(duration)
      localStorage.setItem(
        'session',
        JSON.stringify({
          startTime: now,
          duration: duration,
        })
      )
    }
  }
  // for resume functionality
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const getSession = () => {
        const maybeSession = localStorage.getItem('session')
        if (!maybeSession) return
        const session = JSON.parse(maybeSession)
        return session
      }
      const session = getSession()

      if (!session) return
      setStartTime(session.startTime)
      setDuration(session.duration)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completeSession = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('session')
      clearSession()
    }
  }

  const cancelSession = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      clearSession()
      setStatus('fail')
    }
  }, [])

  // completely resets the session to initial state
  const resetSession = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      clearSession()
      setStatus(undefined)
    }
  }, [])

  return {
    startTime,
    duration,
    status,
    cancelSession,
    resetSession,
    startSession,
    completeSession,
  }
}
