import { Link } from "react-router-dom"
import CardDefault from "./item-card-default"

export default function CardList(props) {
  return (
    <div>
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
        {props.items.map((item) => <CardDefault {...item} /> )}
      </ul>
      {/* <div className="flex justify-center mt-10">
        <button
          type="button"
          className="inline-flex items-center px-6 py-2 border-2 border-indigo-600 rounded-full text-md font-medium text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 focus:outline-none"
        >
          Load More
        </button>
      </div> */}
    </div>   
  )
}