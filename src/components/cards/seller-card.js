import { Link } from "react-router-dom"
import { ChartBarIcon, PlusCircleIcon } from '@heroicons/react/solid'

export default function SellerCard(props) {
  return (
    <li
      key={props.email}
      className="col-span-1 flex flex-col text-center bg-white border rounded-lg divide-y divide-gray-200 px-4 pb-2 shadow-md"
    >
      <div className="flex justify-between py-4">
        <div className="flex justify-center">
          <span className="px-2 py-1 text-gray-700 text-sm font-medium bg-gray-100 rounded-full">
            <ChartBarIcon className="h-4 w-4 inline mr-1 mb-1" />
            <span className="font-bold">#1</span>
          </span>
        </div>
        <div className="flex justify-center">
          <Link
            to="/user"
            className="relative inline-flex items-center pl-2 pr-1 py-1 border border-indigo-600 text-xs font-bold rounded-full text-indigo-600 bg-white shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none"
          >
            <p className="mt-0.5">Follow</p>
            <PlusCircleIcon className="h-4 w-4 inline ml-1" />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col py-4">
        <img className="w-20 h-20 flex-shrink-0 mx-auto bg-black rounded-full shadow-lg" src={props.imageUrl} alt="" />
        <h3 className="mt-4 text-gray-700 text-md font-bold">{props.name}</h3>
        <dl className="mt-1 mb-3 flex-grow flex flex-col justify-between">
          <dd className="font-medium text-gray-700">{props.title}</dd>
        </dl>
        <Link
          to="/user"
          className="relative inline-flex justify-center items-center pl-2 pr-1 py-1 border border-transparent text-sm font-bold rounded-full text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none"
        >
          View Profile
        </Link>
      </div>
    </li>
  )
}