import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import AppUrls from "../../AppSettings";
import Modal from "../../components/modal";
import { classNames } from '../../utilities/utils'

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function UsernameSignIn(props) {
  const [accept1, setAccept1] = useState(false)
  const [accept2, setAccept2] = useState(false)

  function handleConfirmTwoFactorSignIn() {
    props.setUsernameModalOpen(false);
    goToTwoFactorSignInPage();
  }

  function goToTwoFactorSignInPage() {
    window.open(
      `${appUrls.fomoHost}/account/login?fomoClient=1&returnUrl=${appUrls.fomoClient}/user`,
      "_self"
    );
  }

  return (
    <Modal
      title="Fomo Lab Terms of Service"
      open={props.usernameModalOpen}
      setOpen={(v) => props.setUsernameModalOpen(v)}
    >
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-5">
              Please take a few minutes to read and understand the{" "}
              <a href="/terms" target="_blank" className="text-indigo-600 font-bold">
                Fomo Lab Terms of Service
              </a>
              . To continue, you'll need to accept the Terms of Service by
              checking the box.
            </p>
            <div className="flex items-center justify-center px-5 mb-3">
              <div className="h-5 flex items-center">
                <input
                  id="minage"
                  name="minage"
                  type="checkbox"
                  className="focus:outline-none h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={(e) => setAccept1(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="minage" className="font-medium text-gray-700">
                  I am at least 13 years old
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center px-5">
              <div className="h-5 flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:outline-none h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={(e) => setAccept2(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I accept the Fomo Lab terms of service
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className={classNames(
            accept1 && accept2
              ? "opacity-100"
              : "opacity-50",
            "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm transition-opacity"
          )}
          onClick={() => handleConfirmTwoFactorSignIn()}
          disabled={accept1 && accept2 ? false : true}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => props.setUsernameModalOpen(false)}
          // ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
