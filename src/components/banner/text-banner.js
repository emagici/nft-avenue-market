function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TextBanner(props) {
  return (
    <div
      className={classNames(
        props.bgColor ? props.bgColor : "bg-gray-100",
        "rounded-2xl my-5 shadow-md"
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div
          className={classNames(
            props.textColor ? props.textColor : "text-gray-900",
            "text-center"
          )}
        >
          <p className="text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl mb-3">
            {props.title}
          </p>
          <p className="max-w-xl mx-auto text-md md:text-lg md:text-xl font-bold">
            {props.subtitle}
          </p>
          {props.children ? (
            <div className="mt-10">
              {props.children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
