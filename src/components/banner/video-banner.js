import IntroVideo from '../../assets/video/the-avenue-v2-launch.mp4'

export default function VideoBanner(props) {
  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto">
        <video src={IntroVideo} className="banner-video" autoPlay playsInline loop muted={false} controls />
      </div>
    </div>
  )
}
