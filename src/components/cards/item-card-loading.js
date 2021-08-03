import { Fragment, useState } from 'react'

export default function ItemCardLoading(props) {
  return (
    <li className="relative">
      <div className="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-200 focus:outline-none overflow-hidden mb-4 shadow-xl animate-pulse">
      </div>
    </li>
  )
}