'use client'
import { useEffect, useState } from 'react'

export const Badge = ({ warehousename }: any) => {
  useEffect(() => {
    setWarehousename(warehousename)
  }, [warehousename])
  const [warehouseName, setWarehousename] = useState(warehousename || '')

  return (
    <span className="badge">
      {/* <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.35899 1.59033L16.956 6.233V15.0452L11.2355 18.4097V9.59751L3.62941 4.96095L9.35899 1.59033Z"
          fill="#ffffff"
        />
        <path d="M8.77667 17.9211V11.0447L3.04407 14.4153L8.77667 17.9211Z" fill="#ffffff" />
      </svg>
      Beta */}
      <img src="logo.jpeg" width="60" height="60" style={{ borderRadius: '16px' }} alt="Logo" />{' '}
      <h1> Nana </h1> <view style={{ fontSize: 20, color: 'blue' }}>{warehouseName}</view>
    </span>
  )
}
