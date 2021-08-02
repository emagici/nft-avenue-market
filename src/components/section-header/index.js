import React from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SectionHeader(props) {
  return (  
    <div>
      <div className="pb-5 mb-10 border-b border-gray-200">
        <h1
          className={classNames(
            "block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl",
            props.titleClasses ? props.titleClasses : "text-center md:text-left"
          )}
        >{props.title}</h1>
        {props.children ? (
          <div className="mt-5">
            {props.children}
          </div>
        ) : null}
      </div>
    </div>
  )
}
