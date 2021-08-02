export default function AvatarLoading(props) {
  return (
    <div className="space-y-4 animate-pulse">
      <span className="inline-block relative hover:opacity-90">
        <div className="mx-auto h-20 w-20 rounded-full ring-4 bg-gray-200 ring-white shadow-lg lg:w-24 lg:h-24"></div>
      </span>
      <div className="space-y-2">
        <div className="text-xs font-bold lg:text-sm h-4 block bg-gray-200 -mt-2 mx-4">
        </div>
      </div>
    </div>
  )
}
