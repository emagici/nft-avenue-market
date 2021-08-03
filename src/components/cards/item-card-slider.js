import { Link } from "react-router-dom"

export default function ItemCardSlider(props) {
  return (
    <div className="relative mb-8 mx-3">
      <div className="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-100 focus:outline-none overflow-hidden mb-4 shadow-lg">
        <img src={props.source} alt="" className="object-cover pointer-events-none group-hover:opacity-90 transition-opacity" />
        {!props.nolink ? (
          <Link
            to={`/item-detail?id=${props.id}`}
            className="absolute inset-0 focus:outline-none"
          >
            <span className="sr-only">View details for {props.title}</span>
          </Link>
        ) : null}
      </div>
      <div className="flex justify-between">
        <p className="mt-2 block text-md font-medium text-gray-900 truncate pointer-events-none">{props.title}</p>
        <p className="mt-2 block text-sm py-1 px-2 rounded-md inline border-2 border-green-500 font-bold text-green-500 truncate pointer-events-none">{props.price}</p>
      </div>
      <div className="flex justify-between items-end border-b border-gray-200 pb-3">
        {props.nolink ? (
          <div className="flex items-center">
            <img
              className="inline-block h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              alt=""
            />
            <p className="hidden sm:block text-xs ml-1.5 font-bold">CryptoChown</p>
          </div>
        ) : (
          <Link to="/user">
            <div className="flex items-center">
              <img
                className="inline-block h-6 w-6 rounded-full"
                src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <p className="hidden sm:block text-xs ml-1.5 font-bold mt-1">CryptoChown</p>
            </div>
          </Link>
        )}
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{props.available}</p>
      </div>
      <div className="flex justify-between">
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none"><span className="font-light">Highest bid </span>{props.highestbid}</p>
        {/* {props.sellItem ? (
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex justify-center items-center px-2 py-1 mt-1 shadow-md text-xs font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            <span>Sell Item</span>
          </button>
        ) : null} */}
      </div>
    </div>
  )
}