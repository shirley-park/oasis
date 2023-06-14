'use client'
import { useSessionsWithTrees } from '@/hooks/useTreeHistory'
import Image from 'next/image'

const SingleTree = () => {
  return (
    <>
      <Image
        src="/images/palmtree.svg"
        alt="palm tree"
        width="0"
        height="0"
        style={{
          width: '60px',
          height: 'auto',
        }}
      />
    </>
  )
}

export const TreesPlantedHistory = () => {
  const sessions = useSessionsWithTrees()

  return (
    <div className="absolute top-[72%] w-full flex flex-wrap">
      {sessions.map((session) => (
        <SingleTree key={session.startTime} />
      ))}
    </div>
  )
}
