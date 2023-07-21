import React from 'react'

const Text = ({className, children, ...rest}) => {
  return (
    <p className={className} {...rest}>
      {children}
    </p>
  )
}

export default Text
