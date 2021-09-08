import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Navbar from "./components/navbar"
import Routes from "./routes"
import Footer from "./components/footer"
import ScrollToTop from "./scrollToTop"
import LoadingSpinner from "./components/loading-spinner"
import PageTitle from "./components/page-title"
import CookieConsent from "react-cookie-consent"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./App.css"

import { ToastProvider } from "react-toast-notifications"
import { UserProvider } from "./context/user-context"
import { Web3Provider } from "./context/web3-context"
import { SharedProvider } from "./context/shared-context"
import { WalletProvider } from "./context/wallet-context"

import Zendesk from "react-zendesk"
const ZENDESK_KEY = "910f648e-8292-4d8e-abf2-d4282903c0b2"

function App() {
  return (
    <SharedProvider>
      <Web3Provider>
        <UserProvider>
          <WalletProvider>
            <ToastProvider
              autoDismiss
              autoDismissTimeout={4000}
              placement="top-right"
            >
              <LoadingSpinner />
              <PageTitle />
              <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-white">
                  <Navbar />
                  <div className="">
                    <Switch>
                      {Routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ))}
                      <Redirect to="/" />
                    </Switch>
                  </div>
                  <Footer />
                </div>
              </Router>
              <Zendesk
                defer
                zendeskKey={ZENDESK_KEY}
                onLoaded={() => console.log("is loaded")}
              />
              <CookieConsent
                location="bottom"
                buttonText="Continue"
                cookieName="theavenue"
                style={{ background: "rgba(0,0,0,0.9)" }}
                buttonStyle={{
                  background: "#11B981",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "600",
                  borderRadius: 999,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
                expires={150}
              >
                We use cookies to improve users experience. By browsing our site
                you are agreeing to our{" "}
                <a href="/privacy-policy" className="font-medium underline">
                  privacy policy
                </a>
                .
              </CookieConsent>
            </ToastProvider>
          </WalletProvider>
        </UserProvider>
      </Web3Provider>
    </SharedProvider>
  )
}

export default App
