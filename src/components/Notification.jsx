import { useState } from 'react'

const Notification = ({ message, messageType }) => {
  const [expired, setExpired] = useState(false)

  setTimeout(() => setExpired(true), 5000)

	const classes = `${messageType} notification`

  return expired ?
    null
    :
		<div className={classes}>
			{message}
		</div>
}

export default Notification
