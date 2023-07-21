import React from 'react'

const Images = ({src, className, alt}) => {
  return (
    <img src={src} className={className} alt={alt}/>
  )
}

export default Images
