import React from "react"
import { Link } from "react-router-dom"
import PageTitle from "../../components/page-title"
import PvlaceImg from "../../assets/img/pvlace/pvlace-lg.jpeg"
import FegImg from "../../assets/img/feg/feg-bg.png"
import JcImg from "../../assets/img/cps/cps-banner-1.png"
import { classNames } from "../../utilities/utils"

const drops = [
  {
    title: "Junkie Catz",
    image: JcImg,
    url: "/featured-drop?id=junkiecatz",
  },
  {
    title: "FEG Trading Card Game",
    image: FegImg,
    url: "/featured-drop?id=fegtcg",
  },
  {
    title: "Mark Cavendish",
    image:
      "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1323x615:1325x613)/origin-imgresizer.eurosport.com/2021/06/27/3161852-64792768-2560-1440.jpg",
    url: "/featured-drop?id=cavendish",
  },
  {
    title: "PVLACE 808 MAFIA X GUNBOI",
    image: PvlaceImg,
    url: "/featured-drop?id=pvlace",
  },
  {
    title: "Miami Crypto",
    image:
      "https://rennlist.com/wp-content/uploads/2021/05/Porsche-911-Carrera-Rich-B-Caliene-Rick-Ross-1-e1622224637548.jpg",
    url: "/featured-drop?id=miamicrypto",
  },
]

export default function Featured() {
  return (
    <div className="p-4 md:p-6">
      <PageTitle title="Featured" />

      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5 auto-rows-auto mb-20">
          {drops.map((item, i) => (
            <Link
              key={item.title}
              to={item.url}
              className={classNames(i === 0 ? "md:col-span-2" : "", "")}
            >
              <div
                key={item.title}
                className={classNames(
                  i === 0
                    ? "aspect-w-16 md:aspect-h-4 aspect-h-8"
                    : "aspect-w-16 aspect-h-8",
                  "relative bg-gray-50 rounded-xl shadow-2xl overflow-hidden hover:opacity-90 transition-opacity",
                )}
              >
                <div className="w-full h-full">
                  <div className="absolute inset-0">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                    />
                    <div
                      className="absolute inset-0 bg-gray-600 mix-blend-multiply"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative max-w-6xl px-5 mx-auto text-center flex items-center justify-center w-full h-full">
                    <h1 className="font-extrabold tracking-tight text-white text-xl sm:text-3xl lg:text-5xl">
                      {item.title}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
