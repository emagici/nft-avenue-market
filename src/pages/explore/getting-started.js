import React, { useEffect, useState, useContext } from "react";
import SectionHeader from '../../components/section-header'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";

import BG1 from '../../assets/img/bg/bg-pattern-1.jpeg'

const items = [
  {
    title: "A Guide To NFTs",
    url: "/getting-started/a-guide-to-nfts",
    image: BG1
  },
]

export default function GettingStartedSection() {
  
  return (
    <div className="py-10">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader title="Getting Started" />
        <ul className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="col-span-1">
              <Link to={item.url}>
                <div className="w-full h-72 flex items-center justify-between bg-gray-100 rounded-xl shadow-lg mb-5">
                  {item.image ? (
                    <img src={item.image} className="w-full h-full object-cover rounded-xl" />
                  ) : null}
                </div>
                <div>
                  <p className="text-xl font-bold">{item.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
