export default function TextBanner(props) {
  return (
    <div className="bg-gray-100 rounded-2xl my-5 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-3">
            {props.title}
          </p>
          <p className="max-w-xl mx-auto text-md md:text-lg md:text-xl text-gray-700 font-bold">
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
