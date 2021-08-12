import ReactPlayer from 'react-player'
import IntroVideo from '../../assets/video/avenue-intro-glitch.mp4'
import VideoBox from '../video-box'

export default function VideoBanner(props) {
  return (
    <div className="mt-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* <div className="overflow-hidden mb-8 aspect-w-16 aspect-h-6 rounded-2xl"> */}
        <div className="mb-8 overflow-hidden shadow-xl rounded-2xl">
          {/* <video src="https://youtu.be/4w4Z6ASCkvc" className="absolute top-0 bottom-0 left-0 right-0 object-cover shadow-xl" autoPlay playsInline loop muted controls={false} /> */}
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
