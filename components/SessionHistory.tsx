'use client'
import { useSessionHistory, Session } from '@/hooks/useSessionHistory'
import { useState } from 'react'

const SessionHistoryItem = ({ session }: { session: Session }) => {
  // const d = new Date(session.startTime)

  const [d] = useState(new Date(session.startTime))
  console.log(session.isSuccess)
  return (
    <div
      key={session.startTime}
      className={`border rounded-lg p-2 h-24 w-full flex justify-between items-center my-2 ${
        session.isSuccess ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div>
        <p>Date: {d.toDateString()}</p>
        <p>Duration: {session.duration} minutes</p>
      </div>
      <div>{session.isSuccess ? 'tree' : 'meteor'}</div>
    </div>
  )
}

export const SessionHistory = () => {
  const { sessions } = useSessionHistory((s) => ({
    sessions: s.sessions,
  }))

  return (
    <>
      <div className={'h-screen'}>
        <h2>Your session history</h2>
        {sessions.map((session) => (
          <SessionHistoryItem key={session.startTime} session={session} />
        ))}
      </div>
    </>
  )
}
