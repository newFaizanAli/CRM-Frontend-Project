import React from 'react'
import { FaArrowRight } from "../../../../components/icons"
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div className='h-100 p-7 rounded-xl border border-gray-300  font-semibold'>
      <div className='heading'>
        <h2 className='text-2xl'>Shortcuts</h2>
      </div>
      <div className='shortcut flex gap-5 py-3 px-2'>
          <Link to={'/payable/purchase'} className='text-md flex gap-3'>Purchase Invoice <FaArrowRight size={14} /></Link>
      </div>
      <div className='subheading'>
        <h2 className='text-xl'>Payables</h2>
      </div>
      <div className='shortcut flex gap-5 py-3 px-2'>
          <Link to={'/payable/list'} className='text-md flex gap-3'>Payble LIst <FaArrowRight size={14} /></Link>
      </div>
    </div>
  )
}

export default Index
