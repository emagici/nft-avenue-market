import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Navbar from './components/navbar'
import Routes from './routes'
import Footer from './components/footer'
import ScrollToTop from './scrollToTop'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import LoadingSpinner from "./components/loading-spinner";

import { UserProvider } from "./context/user-context";
import { Web3Provider } from "./context/web3-context";
import { SharedProvider } from "./context/shared-context";

function App() {
  return (
    <SharedProvider>
      <Web3Provider>
        <UserProvider>
          <LoadingSpinner/>
          <Router>
            <ScrollToTop/>
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
              <Footer/>
            </div>
          </Router>
        </UserProvider>
      </Web3Provider>
    </SharedProvider>
  );
}

export default App;
