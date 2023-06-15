'use client'
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
  // for resume functionality
  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completeSession = () => {
    localStorage.removeItem('session')
    clearSession()
  }

  const cancelSession = useCallback(() => {
    clearSession()
    setStatus('fail')
  }, [])

  // completely resets the session to initial state
  const resetSession = useCallback(() => {
    clearSession()
    setStatus(undefined)
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
