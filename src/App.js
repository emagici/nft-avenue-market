import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Routes from "./routes";
import Footer from "./components/footer";
import "./App.css";


import { UserProvider } from "./context/user-context";
import { Web3Provider } from "./context/web3-context";

function App() {
  return (
    <Web3Provider>
      <UserProvider>
        <Router>
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
  );
}

export default App;
