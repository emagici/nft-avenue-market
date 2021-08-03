import IntroVideo from '../../assets/video/avenue-intro-glitch.mp4'

export default function VideoBanner(props) {
  return (
    <div className="mt-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="overflow-hidden mb-8 aspect-w-16 aspect-h-6 rounded-2xl">
          <video src={IntroVideo} className="absolute top-0 bottom-0 left-0 right-0 object-cover shadow-xl" autoPlay playsInline loop muted controls={false} />
        </div>
      </div>
    </div>
  )
}
