import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./pages/Create";
import BlogDetails from "./Components/BlogDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route  path="/Create">
              <Create />
            </Route>
            <Route  path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route  path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;


