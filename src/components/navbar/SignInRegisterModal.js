import React, { useState, Fragment } from "react";
import Modal from "../../components/modal";
import { MailIcon, PencilAltIcon } from '@heroicons/react/solid'
import MMLogo from '../../assets/img/logos/mm-logo.png'

import Register from "./register";
import MetamaskSignIn from "./MetamaskSignIn";
import UsernameSignIn from "./UsernameSignIn";

export default function SignInRegisterModal(props) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [metamaskSignInModalOpen, setMetamaskSignInModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);


  function optionSelected(option) {
    if (!option) return;

    props.setModalOpen(false);

    setTimeout(() => {
      if (option === 'email') {
        setUsernameModalOpen(true)
      }
      else if (option === 'metamask') {
        setMetamaskSignInModalOpen(true)
      }
      else if (option === 'register') {
        setRegisterModalOpen(true)
      }
    }, 300)
  }

  return (
    <Fragment>

      <Modal title="Sign In / Register" open={props.modalOpen} setOpen={(v) => props.setModalOpen(v)} hideFooter>
        <div>
          <div className="mt-3 text-center sm:mt-5">
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-5">Choose an option</p>
              <div className="md:flex justify-center items-center mb-3">
                <button
                  // onClick={() => optionSelected('email')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-300 cursor-not-allowed focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <MailIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" />
                  </div>
                  <p className="">Sign In With Email</p>
                  <br />
                  <p className="text-red-500"><i>Coming Soon</i></p>
                </button>
                <button
                  onClick={() => optionSelected('metamask')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <img src={MMLogo} className="h-10 w-10 object-contain mx-auto -mt-3" />
                    {/* <ClockIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" /> */}
                  </div>
                  <p>Sign In With MetaMask</p>
                </button>
                <button
                  // onClick={() => optionSelected('register')}
                  className="flex md:flex-col justify-center items-center mb-3 px-4 py-2 w-full mx-1.5 md:w-32 md:h-40 shadow-lg text-sm font-bold rounded-2xl border border-gray-200 text-gray-700 bg-gray-300 cursor-not-allowed focus:outline-none"
                >
                  <div className="flex justify-center mb-1">
                    <PencilAltIcon className="h-5 w-5 md:h-7 md:w-7 mr-1 md:mr-0 text-gray-700" aria-hidden="true" />
                  </div>
                  <p>Register New Account</p>
                  <br />
                  <p className="text-red-500"><i>Coming Soon</i></p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
       
      <Register
        registerModalOpen={registerModalOpen}
        setRegisterModalOpen={(v) => setRegisterModalOpen(v)}
      />

      <MetamaskSignIn
        metamaskSignInModalOpen={metamaskSignInModalOpen}
        setMetamaskSignInModalOpen={(v) => setMetamaskSignInModalOpen(v)}
      />
      
      <UsernameSignIn
        usernameModalOpen={usernameModalOpen}
        setUsernameModalOpen={(v) => setUsernameModalOpen(v)}
      />

    </Fragment>
  );
}
