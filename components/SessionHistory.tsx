'use client'
import { useSessionHistory, Session } from '@/hooks/useSessionHistory'
import { useState } from 'react'
import Image from 'next/image'

const SessionHistoryItem = ({ session }: { session: Session }) => {
  const [d] = useState(new Date(session.startTime))
  const isSuccess = session.status === 'success'

  const bgColor = () => {
    switch (session.status) {
      case 'success':
        return 'bg-success'
      case 'fail':
        return 'bg-warning'
    }
  }

  return (
    <div
      className={`rounded-lg p-8 h-24 w-[70%] flex justify-between items-center my-4 ${bgColor()}`}
    >
      <div>
        <p>{d.toLocaleDateString()}</p>
        <p>{isSuccess ? `${session.duration} minutes` : 'you killed a tree'}</p>
      </div>
      <div>
        {isSuccess ? (
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
      <div className="h-full w-full bg-sand flex flex-col items-center ">
        <h2 className="text-lg mb-4">Your session history</h2>
        {sortByMostRecent.map((session) => (
          <SessionHistoryItem key={session.startTime} session={session} />
        ))}{' '}
      </div>
    </>
  )
}
