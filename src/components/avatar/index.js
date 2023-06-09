import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { defaultAvatar } from "../../utilities/utils"

export default function Avatar(props) {
  // console.log(props)
  return (
    <div className="space-y-4">
      <Link to={"/profile-info?userId=" + props.sellerId}>
        <span className="inline-block relative hover:opacity-90 transition-opacity">
          <img
            className="mx-auto h-20 w-20 rounded-full ring-4 bg-gray-100 ring-white shadow-lg lg:w-24 lg:h-24"
            src={
              props.sellerProfilePicUrl
                ? props.sellerProfilePicUrl
                : defaultAvatar
            }
            alt=""
          />
          {props.rank ? (
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 shadow-lg block h-6 w-6 rounded-full ring-2 ring-white bg-yellow-400 border-0 text-black text-sm flex justify-center items-center font-bold">
              {props.index + 1}
            </span>
          ) : null}
          {props.verified ? (
            <span className="absolute top-0 right-0 shadow-lg block h-6 w-6 rounded-full ring-2 ring-white bg-green-600 border-0 text-white text-sm flex justify-center items-center font-bold">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : null}
        </span>
        <div className="space-y-2 mt-2">
          <div className="text-xs font-bold lg:text-sm">
            <h3>
              {props.username.length > 12
                ? `${props.username.substr(0, 12)}...`
                : props.username}
            </h3>
            {props.totalAmountInUsd ? (
              <p className="text-gray-600 font-medium text-xs mt-1">
                (${(Number(props.totalAmountInUsd) / 1000).toFixed(1)}k)
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}
