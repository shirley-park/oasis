import { useEffect, useState } from 'react'

export const useSession = () => {
  const [startTime, setStartTime] = useState<number | undefined>()
  const [duration, setDuration] = useState<number | undefined>()

  // add in a ue for retrieving the session from localstorage
  // add in a start session which sets endTime, and also sets it to the local storage
  // add in complete session
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
    if (startTime) return
    // check local storage for a session
    // if there is one set the start time

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
  }, [startTime])

  const completeSession = () => {
    localStorage.removeItem('session')
    setStartTime(undefined)
    setDuration(undefined)
  }

  return { startTime, duration, startSession, completeSession }
}
