'use client'
import { useTreeHistory, Tree } from '@/hooks/useTreeHistory'
import { useState } from 'react'
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
  const { trees } = useTreeHistory((s) => ({
    trees: s.trees,
  }))

  return (
    <div className="absolute top-[72%] w-full flex flex-wrap">
      {trees.map((tree) => (
        <SingleTree key={tree.id} />
      ))}
    </div>
  )
}
