import { Link } from "react-router-dom"

export default function Avatar(props) {
  console.log(props)
  return (
    <div className="space-y-4">
      <Link to="/user">
        <span className="inline-block relative hover:opacity-90">
          <img className="mx-auto h-20 w-20 rounded-full shadow-lg lg:w-24 lg:h-24" src={props.sellerProfilePicUrl} alt="" />
          <span className="absolute top-0 left-0 shadow-lg block h-6 w-6 rounded-full ring-2 ring-white bg-green-500 text-white text-sm flex justify-center items-center font-bold">
            {props.index+1}
          </span>
        </span>
        <div className="space-y-2">
          <div className="text-xs font-bold lg:text-sm">
            <h3>{props.username.length > 10 ? `${props.username.substr(0,6)}...${props.username.substr(-4,4)}` : props.username}</h3>
            <p className="text-indigo-600 font-bold">{props.sales}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
