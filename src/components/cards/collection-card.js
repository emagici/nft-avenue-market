import { Link } from "react-router-dom"

export default function CollectionCardSlider(props) {
  return (
    <div className="relative mb-8 mx-3 hover:opacity-90 transition-opacity">
      <div className="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-100 focus:outline-none overflow-hidden mb-4 shadow-lg">
        <img src={props.source} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg bg-gradient-to-t from-black to-transparent via-transparent"></div>
      <p className="absolute bottom-0 left-0 text-white font-bold p-3">{props.title}</p>
      {!props.nolink ? (
        <Link
          to={`/featured-drop?id=${props.id}`}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">View details for {props.title}</span>
        </Link>
      ) : null}
    </div>
  )
}