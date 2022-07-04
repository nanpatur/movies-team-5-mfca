import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <div
        className="App container-fluid p-0 bg-dark"
        style={{ minHeight: "100vh" }}
      >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/:id">
            <MovieDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
