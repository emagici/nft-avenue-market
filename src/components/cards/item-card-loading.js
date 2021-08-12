import { Fragment, useState } from 'react'
import Spinner from '../loading-spinner/spinner'

export default function ItemCardLoading(props) {
  return (
    <li className="relative">
      <div className="relative group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-200 focus:outline-none overflow-hidden mb-4 shadow-xl animate-pulse">
        <div className="opacity-40 w-full h-full flex items-center justify-center">
          <Spinner className="h-6 w-6" />
        </div>
      </div>
    </li>
  )
}