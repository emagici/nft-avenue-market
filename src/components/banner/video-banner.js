import VideoBox from '../video-box'

export default function VideoBanner(props) {
  return (
    <div className="mt-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-8 overflow-hidden shadow-xl rounded-2xl">
          <VideoBox
            url="https://youtu.be/4w4Z6ASCkvc"
            containerClasses="pointer-events-none -mt-4 md:-mt-10 -m-10 md:-mb-20"
            playing={true}
            playsinline={true}
            loop={true}
            muted={true}
          />
        </div>
      </div>
    </div>
  )
}
