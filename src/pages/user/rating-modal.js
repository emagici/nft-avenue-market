import React, { useEffect, useState, useContext, Fragment } from "react";
import Modal from "../../components/modal";
import { StarIcon } from '@heroicons/react/solid'

import { SharedContext } from '../../context/shared-context';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RatingModal(props) {
  const sharedContext = useContext(SharedContext);

  const [web3, setWeb3] = useState();
  const [rating, setRating] = useState(0);
  const ratings = [1,2,3,4,5]

  function ratingSelected(val) {
    if (!val) return;
    setRating(val)
  }

  function confirmRating() {
    props.setModalOpen(false)
  }

  return (
    <Modal title="Rate User" open={props.modalOpen} setOpen={(v) => props.setModalOpen(v)} hideFooter>
      <div>
        <p className="text-sm text-gray-500 mb-5 text-center -mt-3">Select rating below</p>
        <div className="flex justify-center items-center">
          {ratings.map(val => (
            <a
              href="javascript:void(0);"
              onClick={() => ratingSelected(val)}
            >
              <StarIcon
                className={classNames(
                  val <= rating
                    ? "text-yellow-400 hover:text-yellow-500"
                    : "text-gray-300 hover:text-gray-400",
                  "h-12 w-12"
                )}
              />
            </a>
          ))}
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="button"
            disabled={!rating}
            className={classNames(
              rating
                ? "opacity-100"
                : "opacity-40",
              "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
            )}
            onClick={() => confirmRating()}
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={() => props.setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
