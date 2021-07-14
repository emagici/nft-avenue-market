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


function App() {
  return (
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
