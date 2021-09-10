import { useEffect, useState } from "react"
import CardDefault from "./item-card-default"
import ItemCardLoading from "./item-card-loading"

export default function CardList(props) {
  const [displayCount, setDisplayCount] = useState(10)
  const [showMoreVisible, setShowMoreVisible] = useState(false)

  useEffect(() => {
    setDisplayCount(10)
  }, [props.items])

  useEffect(() => {
    if (!props.items) return
    if (props.items.length > displayCount) {
      setShowMoreVisible(true)
    } else {
      setShowMoreVisible(false)
    }
  }, [props.items, displayCount])

  return (
    <div>
      {props.loading ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8 mb-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <ItemCardLoading key={i} />
          ))}
        </ul>
      ) : props.items && props.items.length ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {props.items
            .filter((item, i) => i < displayCount)
            .map((item, i) => (
              <CardDefault key={i} {...item} />
            ))}
        </ul>
      ) : (
        <div className="text-center md:text-left text-gray-600">
          <h1 className="font-bold text-xl md:text-2xl mb-1 -mt-2">
            {props.emptyTitle ? props.emptyTitle : "No items found"}
          </h1>
          {props.emptyMsg ? (
            <p className="text-lg mb-20 sm:mb-40">{props.emptyMsg}</p>
          ) : null}
        </div>
      )}

      {!props.loading && !props.hideShowMore && showMoreVisible ? (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setDisplayCount((prevState) => prevState + 10)}
            className="inline-flex items-center px-6 py-2 border-4 border-indigo-600 rounded-full text-md font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 focus:outline-none transition-all"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  )
}
