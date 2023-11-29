import { useState } from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
