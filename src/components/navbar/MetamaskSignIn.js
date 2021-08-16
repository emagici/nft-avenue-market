import React, { useEffect, useState, useContext } from "react";
import { useToasts } from 'react-toast-notifications'
import axios from "axios";
import AppUrls from "../../AppSettings";
import Modal from "../../components/modal";
import { classNames } from '../../utilities/utils'

import { UserContext } from "../../context/user-context";
import { Web3Context } from "../../context/web3-context";

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function MetamaskSignIn(props) {
  const { addToast } = useToasts()

  const [web3, setWeb3] = useState();
  const [accept1, setAccept1] = useState(false);
  const [accept2, setAccept2] = useState(false);

  const userContext = useContext(UserContext);
  const web3Context = useContext(Web3Context);

  useEffect(() => {
    setWeb3(web3Context.state.web3Data);
  }, [web3Context.state.web3Data]);

  const getAccessToken = (sign) => {
    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/TokenAuth/FomoLogin`,
      data: JSON.stringify({ sign: sign }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        userContext.dispatch({
          type: "SET_ACCESS_TOKEN",
          payload: response.data.result.accessToken,
        });

        userContext.dispatch({
          type: "SET_USER_ID",
          payload: response.data.result.userId,
        });
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const signAndGetUserData = async () => {
    const accounts = await web3.eth.getAccounts();
    var myadd = accounts[0];

    web3.eth.personal
      .sign(web3.utils.utf8ToHex("TheAvenue"), myadd)
      .then(async function (sign) {
        getAccessToken(sign);

        userContext.dispatch({
          type: "SET_SIGN",
          payload: sign,
        });
      });
  };

  function handleConfirmSignIn() {
    if (!web3) {
      addToast("Please connect wallet", {
        appearance: 'error',
        autoDismiss: true,
      })
      return;
    }

    props.setMetamaskSignInModalOpen(false);
    signAndGetUserData();
  }

  return (
    <Modal
      title="Fomo Lab Terms of Service"
      open={props.metamaskSignInModalOpen}
      setOpen={(v) => props.setMetamaskSignInModalOpen(v)}
    >
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-5">
              Please take a few minutes to read and understand the{" "}
              <a href="/terms" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold">
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
          onClick={() => handleConfirmSignIn()}
          disabled={accept1 && accept2 ? false : true}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => props.setMetamaskSignInModalOpen(false)}
          // ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
