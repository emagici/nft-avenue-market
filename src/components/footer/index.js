import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Logo from '../../assets/img/fomo/the-avenue-v2.gif'
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faTiktok,
  faMedium,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons'


const navigation = {
  pages: [
    { name: 'Explore', href: '/explore' },
    { name: 'Featured', href: '/featured' },
    { name: 'My Profile', href: '/user' },
    { name: 'FAQ', href: '/faq' },
  ],
  contactus: [
    { name: 'Email Us', href: 'mailto:contactus@fomolab.io' },
    { name: 'Apply For Verification', href: 'https://forms.gle/rrKs57QTfdGA1mJB8', target: "_blank" },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy-policy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/fomo_lab',
      icon: (props) => (
        <FontAwesomeIcon icon={faTwitter} size='lg' {...props} />
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/fomo_lab/',
      icon: (props) => (
        <FontAwesomeIcon icon={faInstagram} size='lg' {...props} />
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@fomolab',
      icon: (props) => (
        <FontAwesomeIcon icon={faTiktok} size='lg' {...props} />
      ),
    },
    {
      name: 'Medium',
      href: 'https://thefomolab.medium.com/',
      icon: (props) => (
        <FontAwesomeIcon icon={faMedium} size='lg' {...props} />
      ),
    },
    {
      name: 'Telegram',
      href: 'https://www.t.me/FOMOlab',
      icon: (props) => (
        <FontAwesomeIcon icon={faTelegramPlane} size='lg' {...props} />
      ),
    },
  ],
}

const CustomForm = ({ status, message, onValidated }) => {

  const [email, setEmail] = useState('');

  useEffect(() => {
    if(status === "success") clearFields();
  }, [status])

  const clearFields = () => {
    setEmail('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email,
    });
}

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-4 flex-col sm:flex-row sm:flex justify-center items-center lg:max-w-md lg:mt-0"
      >
        <input
          className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 sm:max-w-xs"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="your@email.com"
          isRequired
        />
        <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <input
            className="w-full bg-indigo-600 border border-transparent rounded-full py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            label="subscribe"
            type="submit"
            value={status === "sending" ? "Please Wait" : "Subscribe"}
            formValues={[email]}
          />
        </div>
      </form>
      {status === "error" && (
        <div 
          className="text-center font-medium text-red-600 pt-2"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
        className="text-center font-medium text-green-600 pt-2"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  )
};

export default function Footer() {
  const postUrl = "https://fomolab.us6.list-manage.com/subscribe/post?u=25284ccfd48fde835d02a2ad9&id=dfc9aa4be5"

  return (
    <footer className="bg-white mt-20 border-t" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center lg:text-left">
        <div className="pb-8 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-8">
          <div className="md:col-span-3 lg:col-span-2 mb-10 md:mb-5">
            <img src={Logo} className="h-16 mb-3 mx-auto lg:mx-0 lg:-ml-5" />
            <a href="https://fomolab.io">
              <h3 className="text-md font-bold text-gray-700 tracking-wider uppercase">Powered by Fomo Lab</h3>
            </a>
          </div>
          <div className="mb-10 md:mb-0">
            <h3 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Pages</h3>
            <ul className="mt-3 md:mt-6 space-y-4">
              {navigation.pages.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-3 md:mt-6 space-y-4">
              {navigation.contactus.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target={item.target === "_blank" ? "_blank" : "_self"} className="text-base text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Legal</h3>
            <ul className="mt-3 md:mt-6 space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="subscribe" className="border-t border-gray-200 pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0">
          <div>
            <h3 className="text-sm font-bold text-gray-800 tracking-wider uppercase">
              Subscribe to our mailing list
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Get the latest news from the team at Fomo Lab
            </p>
          </div>
          <div>
            <MailchimpSubscribe
              url={postUrl}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  status={status} 
                  message={message}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
          </div>
          {/* <form className="mt-4 flex-col sm:flex-row sm:flex justify-center items-center lg:max-w-md lg:mt-0">
            <label htmlFor="emailAddress" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              autoComplete="email"
              required
              className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 sm:max-w-xs"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </form> */}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2 justify-center">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
            &copy; 2021 Fomo Lab, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
