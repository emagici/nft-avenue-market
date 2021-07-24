import { Link } from "react-router-dom";

export default function PromoBanner(props) {
  return (
    <Link to={props.link} className={props.link ? "" : "disable-link"}>
      <div className="relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden mb-6">
        <div className="absolute inset-0">
          {props.image ? (
            <img
              className="w-full h-full object-cover"
              src={props.image}
              alt=""
            />
          ) : null}
          <div className="absolute inset-0 bg-gray-400 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-6xl mx-auto py-24 px-4 sm:py-28 text-center">
          {props.title ? <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">{props.title}</h1> : null}
          {props.subtitle ? <p className="mt-1 text-3xl font-extrabold text-white">{props.subtitle}</p> : null}
          {props.text ? <p className="mt-6 text-2xl font-bold text-white">{props.text}</p> : null}
        </div>
      </div>
    </Link>
  )
}
