import React from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

import Feg from '../../assets/img/featured/feg.png'
import Cavendish from '../../assets/img/featured/mc.jpeg'
import Pvlace from '../../assets/img/featured/pvlace.jpeg'
import MiamiCrypto from '../../assets/img/featured/miamicrypto.jpeg'
import QuestionMark from '../../assets/img/featured/question-mark.jpeg'


export default function FeaturedGrid() {
  return (
    <section className="pb-20">
      <div className="max-screen-2xl mx-auto">
        {/* <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
            Shop by Category
          </h2>
        </div> */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          <div className="group aspect-w-2 aspect-h-1 rounded-lg shadow-lg overflow-hidden col-span-2">
            <ReactPlayer 
              className="object-center object-cover"
              width="100%"
              height="100%"
              url="https://youtu.be/4w4Z6ASCkvc"
              playing
              playsinline
              loop
              muted
              // controls
            />
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg shadow-lg overflow-hidden relative h-full">
            <img
              src={Feg}
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-center object-cover group-hover:opacity-90 sm:absolute sm:inset-0 sm:w-full sm:h-full transition-opacity"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-2xl">
                  <Link to="/featured-drop?id=fegtcg">
                    <span className="absolute inset-0" />
                    FEG TCG
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg shadow-lg overflow-hidden relative h-full">
            <img
              src={Cavendish}
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-center object-cover group-hover:opacity-90 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-2xl">
                  <Link to="/featured-drop?id=cavendish">
                    <span className="absolute inset-0" />
                    Mark Cavendish
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg shadow-lg overflow-hidden relative h-full order-5 md:order-4">
            <img
              src={Pvlace}
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-center object-cover group-hover:opacity-90 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-2xl">
                  <Link to="/featured-drop?id=pvlace">
                    <span className="absolute inset-0" />
                    PVLACE x 808 MAFIA x GUNBOI
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg shadow-lg overflow-hidden relative h-full order-6 md:order-5">
            <img
              src={MiamiCrypto}
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-center object-cover group-hover:opacity-90 sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-2xl">
                  <Link to="/featured-drop?id=miamicrypto">
                    <span className="absolute inset-0" />
                    Miami Crypto
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 rounded-lg shadow-lg overflow-hidden col-span-2 order-4 md:order-6">
            <img
              src={QuestionMark}
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-center object-cover"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-2xl">
                  <span className="absolute inset-0" />
                  Next Featured Drop Coming Soon
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>    
  )
}
