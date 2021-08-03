import Avatar from "./index"
import AvatarLoading from "./avatar-loading"

export default function AvatarList(props) {
  return (
    <div className="">
      <div className="text-center">
        <div className="space-y-8 sm:space-y-12">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-8">
            {props.loading ? (
              [0,1,2,3,4,5,6,7].map(i => (
                <li key={i}>
                  <AvatarLoading/>
                </li>
              ))
            ) : (
              props.items && props.items.length ? (
                props.items.map((item, index) => (
                  <li key={item.name}>
                    <Avatar index={index} {...item} />
                  </li>
                ))
              ) : (
                <div>
                  No results
                </div>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
