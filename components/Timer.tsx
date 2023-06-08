import { useState, useEffect } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useSessionHistory } from '../hooks/useSessionHistory'
import { useLeavePageConfirm } from '../components/UseLeave'
import Image from 'next/image'
import { SessionHistory } from './SessionHistory'
import { useTreeHistory } from '@/hooks/useTreeHistory'
import { TreesPlantedHistory } from './TreesPlantedHistory'
import palmtree from '../public/images/palmtree.svg'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const Timer = () => {
  useLeavePageConfirm(true)
  const [endTime, setEndTime] = useState<number | undefined>()
  const [timeInput, setTimeInput] = useState<number>(1) //minutes
  const { sessions, addSession } = useSessionHistory((s) => ({
    sessions: s.sessions,
    addSession: s.addSession,
  }))
  const { addTree } = useTreeHistory((s) => ({
    addTree: s.addTree,
  }))

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    setEndTime(Date.now() + timeInput * SECOND)
  }

  const handleChangeTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTimeInput(value)
  }

  const handlePlantTree = (e: React.FormEvent) => {
    e.preventDefault()
    addSession({ startTime: Date.now(), duration: timeInput, isSuccess: true })
    addTree({ id: Date.now(), tree: palmtree })
    setEndTime(undefined)
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
        style={{ width: '40%', height: 'auto' }}
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
