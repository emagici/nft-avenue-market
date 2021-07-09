import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TitleDropdown(props) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!props.options || !props.active) return
    setActive(props.options.filter(item => item.id == props.active)[0])
  }, [props.active, props.options])

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="">
             <div className="flex items-center cursor-pointer">
                <h2 className="text-4xl font-bold text-indigo-700">
                  {active && active.title ? (
                    active.title
                  ) : (
                    "All"
                  )}
                </h2>
                <ChevronDownIcon className="h-8 w-8 mt-1"/>
              </div>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className={classNames(
                props.menuPosition ? `${props.menuPosition}-0` : 'left-0',
                "origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
              )}
            >
              <div className="py-1">
                {props.options ? (
                  props.options.map((item, index) => (
                    <Menu.Item>
                      <a
                        href="javascript:void(0);"
                        key={index}
                        onClick={() => props.onChange(item.id)}
                        className={classNames(
                          active && active.id == item.id ? 'bg-gray-100 text-gray-800 font-bold' : 'text-gray-700 font-medium ',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {item.title}
                      </a>
                    </Menu.Item>
                  ))
                ) : null}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
