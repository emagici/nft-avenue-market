import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import AppUrls from "../../AppSettings";
import Modal from "../../components/modal";
import Spinner from '../../components/loading-spinner/spinner';

const appUrls = {
  fomoHost: AppUrls.fomoHost,
  fomoHostApi: AppUrls.fomoHostApi,
  fomoClient: AppUrls.fomoClient,
};

export default function Register(props) {
  const [registerItem, setRegisterItem] = useState({Username: '', Password: '', Email: ''});
  const [seedWordsModalOpen, setSeedWordsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [passwordResetItem, setPasswordResetItem] = useState({ UserEmail: ''});
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [passwordResetSuccessModalOpen, setPasswordResetSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerNewUser = (e) => {
    e.preventDefault();

    if(!registerItem.Username || !registerItem.Password || !registerItem.Email)
    {
      alert("Please fill all details.")
      return;
    }

    setLoading(true);
    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/Account/Register`,
      data: JSON.stringify({ name: registerItem.Username, surname: registerItem.Username, userName: registerItem.Username, emailAddress: registerItem.Email, password: registerItem.Password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
        setLoading(false);
        props.setRegisterModalOpen(false);
        alert('success');
        console.log(response);
        // setSeedWords(response.data.result.seedWords);
        setWalletAddress(response.data.result.address);
        setSeedWordsModalOpen(true);
    })
    .catch(function (response) {
      setLoading(false);
    });
  }

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: `${appUrls.fomoHostApi}/api/services/app/Account/SendPasswordResetCode`,
      data: JSON.stringify({ emailAddress: passwordResetItem.UserEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
        setPasswordResetModalOpen(false);
        setPasswordResetSuccessModalOpen(true);
        alert('success');
        console.log(response);
    })
    .catch(function (response) {
        alert("Invalid email address");
        setPasswordResetModalOpen(true);
        console.log(response);
    })
    .finally(function(){
      setLoading(false);
    });
  }

  const openPasswordResetModal = (e) => {
    e.preventDefault();
    props.setRegisterModalOpen(false);
    setPasswordResetModalOpen(true);
    
  }

  return (
    <>
    <Modal
      title="Register"
      open={props.registerModalOpen}
      setOpen={(v) => props.setRegisterModalOpen(v)}
    >
      {/* <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> */}
      <div class="">
        <form class="space-y-3" action="#" method="POST">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={registerItem.Username}
                onChange={(e) => setRegisterItem({...registerItem, Username: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={registerItem.Email}
                onChange={(e) => setRegisterItem({...registerItem, Email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={registerItem.Password}
                onChange={(e) => setRegisterItem({...registerItem, Password: e.target.value})}
              />
            </div>
          </div>

          <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" onClick={(e) => openPasswordResetModal(e)}>
                Reset Password
              </a>
            </div>
          </div>

          <div>

          {loading ? (
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-bold text-center capitalize">Processing</h1>
                <Spinner className="h-6 w-6 ml-2" />
              </div>
          ) : (
              <button onClick={(e) => registerNewUser(e)} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
          ) }
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Facebook</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>

            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Google</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
              </a>
            </div>

            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with GitHub</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  
    <Modal
          title="Wallet"
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
                    Your wallet address: <br />
                    {walletAddress}
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

        <Modal
          title="Reset password"
          open={passwordResetModalOpen}
          setOpen={(v) => setPasswordResetModalOpen(v)}
          >
            <div class="">
              {loading ? (
                <div className="flex items-center justify-center">
                  <h1 className="text-2xl font-bold text-center capitalize">Processing</h1>
                  <Spinner className="h-6 w-6 ml-2" />
                </div>
              ) : (
                <form class="space-y-3" action="#" method="POST">
                  
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div class="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autocomplete="email"
                          required
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={passwordResetItem.UserEmail}
                          onChange={(e) => setPasswordResetItem({...passwordResetItem, UserEmail: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <button onClick={(e) => resetPassword(e)} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                      </button>
                    </div>

                </form>
              )}
            </div>
          </Modal>

        <Modal
          title="Reset password"
          open={passwordResetSuccessModalOpen}
          setOpen={(v) => setPasswordResetSuccessModalOpen(v)}
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
                      A password reset link sent to your e-mail address. Please check your emails.
                    </label>
                  </div>
                </div>
                <br />

              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setPasswordResetSuccessModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
        
    </>
  );
}
