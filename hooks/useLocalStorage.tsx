import { useState, useEffect } from 'react'

const useLocalStorage = (sessionHistory, {}) => {
  const [value, setValue] = useState(() => {
    let currentValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem('sessionHistory') || String({})
      )
    } catch (error) {
      currentValue = {}
    }

    return currentValue
  })

  useEffect(() => {
    localStorage.setItem(sessionHistory, JSON.stringify(value))
  }, [value, sessionHistory])

  return [value, setValue]
}

export default useLocalStorage
