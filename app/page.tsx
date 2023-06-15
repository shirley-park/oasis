import { Timer } from '../components/Timer'

export default function Home() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('sessionHistory')
  }
  return (
    <main className="flex flex-col items-center justify-center">
      <Timer />
    </main>
  )
}
