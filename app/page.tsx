'use client'

import Image from 'next/image'
import { Timer } from '../components/Timer'
import { SessionHistory } from '@/components/SessionHistory'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Timer />
      <SessionHistory />
    </main>
  )
}
