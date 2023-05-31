import { useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useSessionHistory } from '../hooks/useSessionHistory'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const Timer = () => {
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
      <h1 className="text-lg">Focus and grow your oasis</h1>
      {!endTime && (
        <form action="" className="flex flex-col items-center">
          <h4>select from 5 to 60 minutes</h4>
          <div>{timeInput}</div>
          <label htmlFor="timeInput">Time</label>
          <input
            style={{ width: '250px' }}
            id="timeInput"
            type="range"
            min="1"
            max="60"
            step="1"
            value={timeInput}
            onChange={handleChangeTimeInput}
            className="text-black "
          ></input>
          <button
            className="border-2 border-gray-300 rounded-3xl p-2"
            onClick={handleClick}
          >
            Start timer
          </button>
        </form>
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
    </>
  )
}
