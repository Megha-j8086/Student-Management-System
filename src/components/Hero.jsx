

import React from 'react'
import stud from '../assets/stud-logo.png'

const Hero = () => {
  return (
    <div className="hero-section text-white text-center py-5">
     <img src={stud} alt="" className='hero-image' />
      <h1 className="fw-bold">Welcome to Student Dashboard</h1>
      <p>Manage student records efficiently</p>
    </div>
  )
}

export default Hero