import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import Entrance from "./pages/Entrance/Entrance.jsx";
import Header from "./UI/Header/Header";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import { useUserAreaContext } from "./providers/UserAreaProvider";


function App() {
  const [author] = useUserAreaContext();


  return (
    <div className="App">
      {author && <Header />}

      <Route exact path="/">
        <Entrance />
      </Route>

      {author && (
        <>
          <Route exact path="/loggedin">
            <LoggedIn />
          </Route>
        </>
      )}
    </div>
  );
}

export default App;
