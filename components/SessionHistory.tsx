'use client'
import { useSessionHistory, Session } from '@/hooks/useSessionHistory'
import { useState } from 'react'
import Image from 'next/image'

const SessionHistoryItem = ({ session }: { session: Session }) => {
  const [d] = useState(new Date(session.startTime))

  return (
    <div
      key={session.startTime}
      className={`rounded-lg p-8 h-24 w-[70%] flex justify-between items-center my-4 ${
        session.isSuccess
          ? 'border-4 border-lime-600 bg-lime-200 '
          : 'border-4 border-red-600 bg-red-300'
      }`}
    >
      <div>
        <p>{d.toLocaleDateString()}</p>
        <p>
          {session.isSuccess
            ? `${session.duration} minutes`
            : 'you killed a tree'}
        </p>
      </div>
      <div>
        {session.isSuccess ? (
          <Image
            src="/images/palmtree.svg"
            alt="palm tree"
            width="0"
            height="0"
            style={{ width: '50px', height: 'auto' }}
          />
        ) : (
          <Image
            src="/images/deadtree.svg"
            alt="dead palm tree"
            width="0"
            height="0"
            style={{ width: '50px', height: 'auto' }}
          />
        )}
      </div>
    </div>
  )
}

export const SessionHistory = () => {
  const { sessions } = useSessionHistory((s) => ({
    sessions: s.sessions,
  }))

  const sortByMostRecent = sessions.sort((objA, objB) =>
    Number(objB.startTime - objA.startTime)
  )

  return (
    <>
      <div className=" h-screen w-full bg-sand flex flex-col items-center">
        <h2 className="text-lg mb-6">Your session history</h2>
        {sortByMostRecent.map((session) => (
          <SessionHistoryItem key={session.startTime} session={session} />
        ))}{' '}
      </div>
    </>
  )
}
