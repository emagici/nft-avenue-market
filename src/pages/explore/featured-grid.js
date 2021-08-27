import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedGrid() {
  return (
    <section className="pb-20">
      <div className="max-screen-2xl mx-auto">
        {/* <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
            Shop by Category
          </h2>
        </div> */}

        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 md:grid-rows-2">
          <div className="group aspect-w-2 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden col-span-2 bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/c_scale,q_auto,w_754/v1628860907/avenue-v2-promo_qtkz3r.mp4"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden relative h-full bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/c_scale,q_auto,w_737/v1628865396/fegnft-promo_hqgrqn.mp4"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0 rounded-lg md:rounded-2xl"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-lg md:text-2xl">
                  <Link to="/featured-drop?id=fegtcg">
                    <span className="absolute inset-0" />
                    FEG TCG
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden relative h-full bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/c_scale,q_auto,w_355/v1628864767/mc-video_mzsuhf.mp4"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0 rounded-lg md:rounded-2xl"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-lg md:text-2xl">
                  <Link to="/featured-drop?id=cavendish">
                    <span className="absolute inset-0" />
                    Mark Cavendish
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden relative h-full order-5 md:order-4 bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/q_auto/v1628863103/pvlace-showcase_vhmjdz.mp4"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0 rounded-lg md:rounded-2xl"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-lg md:text-2xl">
                  <Link to="/featured-drop?id=pvlace">
                    <span className="absolute inset-0" />
                    PVLACE x 808 MAFIA x GUNBOI
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-1 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden relative h-full order-6 md:order-5 bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/c_scale,q_auto,w_735/v1628864951/porsche-911-miamicrypto_k1yyz6.mp4"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0 rounded-lg md:rounded-2xl"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-lg md:text-2xl">
                  <Link to="/featured-drop?id=miamicrypto">
                    <span className="absolute inset-0" />
                    Miami Crypto
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 rounded-lg md:rounded-2xl shadow-lg overflow-hidden col-span-2 order-4 md:order-6 bg-gray-100">
            <video
              src="https://res.cloudinary.com/fomo-lab/video/upload/c_scale,q_auto,w_743/v1628865698/light-grid_dphqb1.mov"
              className="object-cover object-center w-full h-full rounded-lg md:rounded-2xl"
              autoPlay
              playsInline
              loop
              muted
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-80 sm:absolute sm:inset-0 rounded-lg md:rounded-2xl"
            />
            <div className="p-2 md:p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 className="font-bold text-white text-lg md:text-2xl">
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
