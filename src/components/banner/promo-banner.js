export default function PromoBanner() {
  return (
    <div className="relative bg-indigo-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1323x615:1325x613)/origin-imgresizer.eurosport.com/2021/06/27/3161852-64792768-2560-1440.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-700 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-4xl mx-auto py-24 px-4 sm:py-28 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">Mark Cavendish</h1>
        <p className="mt-1 text-2xl font-bold text-white">Official Tour de France NFT Series</p>
        <p className="mt-6 text-2xl font-medium text-white">Fomo Lab have teamed up with Mark Cavendish to bring you an exclusive, limited edition NFT collection</p>
      </div>
    </div>
  )
}
