import { useState, useEffect } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useSessionHistory } from '../hooks/useSessionHistory'
import Image from 'next/image'
import { SessionHistory } from './SessionHistory'
import { useSessionsWithTrees } from '@/hooks/useTreeHistory'
import { TreesPlantedHistory } from './TreesPlantedHistory'
import palmtree from '../public/images/palmtree.svg'
import { useHasFocus } from '@/hooks/useHasFocus'
import { useSession } from '@/hooks/useSession'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const Timer = () => {
  const { startTime, duration, startSession, completeSession } = useSession()
  const endTime = startTime && duration ? startTime + duration : undefined

  const [timeInput, setTimeInput] = useState<number>(1) //minutes
  const { sessions, addSession } = useSessionHistory((s) => ({
    sessions: s.sessions,
    addSession: s.addSession,
  }))

  const focus = useHasFocus()
  useEffect(() => {
    if (!endTime) return

    if (!focus) {
      console.log('lost focus')
    }
    console.log(focus)
  }, [focus, endTime])

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    // add current session to localstorage for resume functionality purposes
    startSession(timeInput * 1000)
  }
  console.log(startTime, duration)

  const handleChangeTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTimeInput(value)
  }

  const handlePlantTree = (e: React.FormEvent) => {
    e.preventDefault()
    completeSession()

    const tree = { image: palmtree }
    addSession({
      startTime: Date.now(),
      duration: timeInput,
      status: 'success',
      tree,
    })

    setTimeInput(1)
  }

  return (
    <>
      <Image
        src="/images/oasis.svg"
        alt="oasis image"
        width={400}
        height={900}
        className="absolute left-0 top-0 w-full object-cover mix-blend-overlay z-[-1] h-full"
        priority={false}
      />
      <Image
        src="/images/oasislogo.svg"
        alt="oasis image"
        width="0"
        height="0"
        className="absolute top-20"
        priority={false}
        style={{ width: '25%', height: 'auto' }}
      />
      <TreesPlantedHistory />
      <div className="h-[95vh] flex items-center ">
        {!endTime && (
          <div className=" border-2 p-6 rounded-lg backdrop-hue-rotate-90 backdrop-opacity-20">
            <form
              action=""
              className="flex flex-col items-center gap-6 h-screens"
            >
              <h1 className="text-lg text-center">Focus and grow your oasis</h1>
              <label htmlFor="timeInput">time (minutes)</label>
              <input
                id="timeInput"
                type="number"
                value={timeInput}
                onChange={handleChangeTimeInput}
                className="
                  rounded-lg p-4 text-center w-[200px]"
              ></input>
              <button
                className=" bg-blue-400 hover:bg-blue-500 text-white rounded-3xl px-4 py-2 "
                onClick={handleClick}
              >
                Start timer
              </button>
            </form>
          </div>
        )}

        {endTime && (
          <Countdown
            date={endTime}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                return (
                  <div className="border-2 p-6 rounded-lg backdrop-hue-rotate-90 backdrop-opacity-20 flex flex-col items-center gap-6">
                    <h3>Nice one!</h3>
                    <p>You&apos;ve finished your session</p>
                    <Image
                      src="/images/palmtree.svg"
                      alt="palm tree"
                      width={60}
                      height={60}
                    />
                    <button
                      className="bg-lime-600 hover:bg-lime-700 text-white rounded-3xl px-4 py-2 "
                      onClick={handlePlantTree}
                    >
                      plant tree
                    </button>
                  </div>
                )
              }
              console.log({ hours, minutes, seconds })
              return (
                <>
                  <div>
                    <p className="text-2xl text-blue-700">
                      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                    </p>
                  </div>
                </>
              )
            }}
          />
        )}
      </div>
      <SessionHistory />
    </>
  )
}
