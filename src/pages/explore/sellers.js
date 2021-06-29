import React from 'react'
import Dropdown from '../../components/dropdown'
import TitleDropdown from '../../components/dropdown/title-dropdown'
import { MailIcon, PhoneIcon, ChartBarIcon, PlusCircleIcon, ArrowCircleRightIcon } from '@heroicons/react/solid'

const people = [
  {
    name: 'Jane Cooper',
    title: '3.45',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: '3.45',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: '3.45',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: '3.45',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function LiveDrop() {
  return (
    <div className="py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">

        <div className="pb-5 mb-10 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-5">Popular</h3>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              {/* <div className="flex items-center cursor-pointer">
                <h2 className="text-4xl font-medium">Sellers</h2>
                <ChevronDownIcon className="h-8 w-8"/>
              </div> */}
              <TitleDropdown title="Sellers" />
            </div>
            <div>
              <Dropdown title="Today" />
            </div>
          </div>
        </div>

        <div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {people.map((person) => (
              <li
                key={person.email}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg border divide-y divide-gray-200 px-4 pb-2"
              >
                <div className="flex justify-between py-4">
                  <div>
                    <span className="px-2 py-1 text-green-800 text-sm font-medium bg-green-100 rounded-full">
                      <ChartBarIcon className="h-4 w-4 inline mr-1 mb-1" />
                      <span className="font-bold">#1</span>
                    </span>
                  </div>
                  <div>
                    <PlusCircleIcon className="h-6 w-6 inline ml-1 text-gray-400" />
                    <ArrowCircleRightIcon className="h-6 w-6 inline ml-1 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-8">
                  <img className="w-24 h-24 flex-shrink-0 mx-auto bg-black rounded-full" src={person.imageUrl} alt="" />
                  <h3 className="mt-6 text-gray-700 text-md font-bold">{person.name}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dd className="font-medium text-gray-700">{person.title}<span className="text-gray-500"> BNB</span></dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  )
}
