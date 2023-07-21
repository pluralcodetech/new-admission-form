import React from 'react'
import { Link } from 'react-router-dom'

const TextLinks = ({to, onClick, className, children}) => {
  return (
    <Link to={to} onClick={onClick} className={className}>{children}</Link>
  )
}

export default TextLinks
