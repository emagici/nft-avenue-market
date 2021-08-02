import React from 'react'
import ReactPlayer from 'react-player'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function VideoBox(props) {
  return (
    <div
      className={classNames(
        props.containerClasses ? props.containerClasses : "",
        "mx-auto"
      )}
    >
      <div
        className={classNames(
          "overflow-hidden mb-8 aspect-w-16 aspect-h-9 rounded-2xl",
          props.boxClasses ? props.boxClasses : ""
        )}
      >
        <ReactPlayer 
          className={classNames(
            "shadow-xl",
            props.videoClasses ? props.videoClasses : ""
          )}
          url={props.url}
          playing={props.playing ? props.playing : false}
          playsinline={props.playsinline ? props.playsinline : false}
          loop={props.loop ? props.loop : false}
          muted={props.muted ? props.muted : false}
          controls={props.controls ? props.controls : false}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}