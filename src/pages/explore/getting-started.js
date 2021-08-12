import React, { useEffect, useState, useContext } from "react";
import SectionHeader from '../../components/section-header'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

const items = [
  {
    title: "Staying safe when buying NFTs on The Avenue Marketplace",
  },
  {
    title: "The beginner's guide to creating and selling digital art NFTs",
  },
  {
    title: "5 reasons to sell NFTs on The Avenue",
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
              <div className="w-full h-72 flex items-center justify-between p-6 space-x-6 bg-gray-100 rounded-xl rounded-lg shadow-lg mb-5">
                
              </div>
              <div>
                <p className="text-xl font-bold">{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
