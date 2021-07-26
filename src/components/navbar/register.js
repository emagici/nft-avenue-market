import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import AppUrls from "../../AppSettings";
import Modal from "../../components/modal";

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function Register(props) {
  const [registerItem, setRegisterItem] = useState({Name: '', Username: '', Password: '', Email: ''});
  const [seedWordsModalOpen, setSeedWordsModalOpen] = useState(false);

  const registerNewUser = () => {
    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/Account/Register`,
      data: JSON.stringify({ name: registerItem.Name, surname: registerItem.Name, userName: registerItem.Username, emailAddress: registerItem.Email, password: registerItem.Password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
        props.setRegisterModalOpen(false);
        alert('success');
        console.log(response);
        // setSeedWords(response.data.result.seedWords);
        setSeedWordsModalOpen(true);
    })
    .catch(function (response) {
        console.log(response);
    });
  }

  return (
    <>
    <Modal
      title="Register"
      open={props.registerModalOpen}
      setOpen={(v) => props.setRegisterModalOpen(v)}
    >
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-5"></p>

            <div className="flex items-center justify-center px-5 mb-3">
              <div className="h-5 flex items-center">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Name
                </label>
              </div>
              <div className="ml-3 text-sm">
                <input
                  value={registerItem.Name}
                  onChange={(e) =>
                    setRegisterItem({ ...registerItem, Name: e.target.value })
                  }
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center justify-center px-5 mb-3">
              <div className="h-5 flex items-center">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Username
                </label>
              </div>
              <div className="ml-3 text-sm">
                <input
                  value={registerItem.Username}
                  onChange={(e) =>
                    setRegisterItem({
                      ...registerItem,
                      Username: e.target.value,
                    })
                  }
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center justify-center px-5 mb-3">
              <div className="h-5 flex items-center">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="ml-3 text-sm">
                <input
                  required
                  value={registerItem.Password}
                  onChange={(e) =>
                    setRegisterItem({
                      ...registerItem,
                      Password: e.target.value,
                    })
                  }
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center justify-center px-5 mb-3">
              <div className="h-5 flex items-center">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Email
                </label>
              </div>
              <div className="ml-3 text-sm">
                <input
                  value={registerItem.Email}
                  onChange={(e) =>
                    setRegisterItem({ ...registerItem, Email: e.target.value })
                  }
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
          onClick={() => registerNewUser()}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => props.setRegisterModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  
    <Modal
          title="Seed words"
          open={seedWordsModalOpen}
          setOpen={(v) => setSeedWordsModalOpen(v)}
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-5">
                </p>
               
                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                  <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      A wallet has been created for you!
                    </label>
                  </div>
                </div>
                <br />
                <div className="flex items-center justify-center px-5 mb-3">
                  <div className="h-5 flex items-center">
                    <div className="italic">
                      Check your email inbox for your new wallet's seed words.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setSeedWordsModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
    </>
  );
}
