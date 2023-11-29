import { useState } from 'react'

const Notification = ({ message }) => {
  const [expired, setExpired] = useState(false)

  setTimeout(() => {
    setExpired(true)
    message.expired = true
  }, 5000)

	const classes = `${message.messageType} notification`

  return expired ?
    null
    :
		<div className={classes}>
			{message.message}
		</div>
}

export default Notification
