import React from 'react'

export default function SectionTitle(props) {
  return (  
    <h1 className="mb-5">
      {props.subtitle ? (
        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          Introducing
        </span>
      ) : null}
      <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {props.title}
      </span>
    </h1>
  )
}
