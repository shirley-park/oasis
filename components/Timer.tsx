import { useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useSessionHistory } from '../hooks/useSessionHistory'
import { useLeavePageConfirm } from '../components/UseLeave'
import Image from 'next/image'
import { SessionHistory } from './SessionHistory'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const Timer = () => {
  useLeavePageConfirm(true)
  const [endTime, setEndTime] = useState<number | undefined>()
  const [timeInput, setTimeInput] = useState<number>(0) //minutes
  const { sessions, addSession } = useSessionHistory((s) => ({
    sessions: s.sessions,
    addSession: s.addSession,
  }))
  console.log({ sessions })
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    addSession({ startTime: Date.now(), duration: timeInput })
    setEndTime(Date.now() + timeInput * MINUTE)
  }

  const handleChangeTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTimeInput(value)
  }

  return (
    <>
      <Image
        src="/images/oasis.svg"
        alt="oasis image"
        width={400}
        height={900}
        className="absolute left-0 top-0 w-full object-cover mix-blend-overlay z-[-1] h-full"
      />
      <Image
        src="/images/oasislogo.svg"
        alt="oasis image"
        width={170}
        height={100}
        className="absolute top-28"
      />
      <div className="h-screen flex items-center">
        {!endTime && (
          <div className="border-2 p-6 rounded-lg backdrop-hue-rotate-90 backdrop-opacity-30">
            <form action="" className="flex flex-col items-center gap-4">
              <h1 className="text-md text-center">Focus and grow your oasis</h1>
              <label htmlFor="timeInput" hidden></label>
              <input
                id="timeInput"
                type="number"
                defaultValue="1"
                value={timeInput}
                onChange={handleChangeTimeInput}
                className="
                  rounded-lg p-4 text-center w-[200px]"
              ></input>
              <button
                className=" bg-blue-400 hover:bg-blue-500 text-white rounded-3xl px-4 py-2 text-sm"
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
                  <>
                    <p>WOOHOO!</p>
                  </>
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
