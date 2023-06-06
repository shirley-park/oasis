'use client'

import Image from 'next/image'
import { Timer } from '../components/Timer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Timer />
    </main>
  )
}
