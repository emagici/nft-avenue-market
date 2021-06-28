export default function TextBanner() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="max-w-xl mx-auto text-xl text-gray-700 uppercase font-bold mb-3">
            Create, Explore, Collect Digital Art NFTs
          </p>
          <p className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-10">
            The New Creative Economy
          </p>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border-4 border-indigo-600 text-md font-bold rounded-full text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white"
          >
            <span>Start Your Search</span>
          </button>
        </div>
      </div>
    </div>
  )
}
