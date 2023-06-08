import { useEffect } from 'react'
import Router from 'next/router'
import { useBeforeUnload } from 'react-use'

export const useLeavePageConfirm = (
  isConfirm = true,
  message = 'You killed a tree'
) => {
  useBeforeUnload(isConfirm, message)

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        return (
          <>
            <p>Noo!</p>
          </>
        )
      }
    }

    Router.events.on('beforeHistoryChange', handler)

    return () => {
      Router.events.off('beforeHistoryChange', handler)
    }
  }, [isConfirm, message])
}
