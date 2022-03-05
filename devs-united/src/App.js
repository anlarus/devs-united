import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import Entrance from "./pages/Entrance/Entrance.jsx";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import { useUserAreaContext } from "./providers/UserAreaProvider";
import {Tm} from "./UI/TM/Tm"


function App() {
  const [author] = useUserAreaContext();


  return (
    <div className="App">
 

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

      <Tm/>
    </div>
  );
}

export default App;
