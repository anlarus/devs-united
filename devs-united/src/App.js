import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import Entrance from "./pages/Entrance/Entrance.jsx";
import Header from "./UI/Header/Header";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
//import { Edit } from "./Edit";
import { useUserAreaContext } from "./providers/UserAreaProvider";
//import { useAuthState } from "react-firebase-hooks";

function App() {
  const [author] = useUserAreaContext();
  //const [user] = useAuthState();

  return (
    <div className="App">
      {author && <Header />}

      <Route exact path="/">
        <Entrance />
      </Route>

      {/* <Route exact path="/edit/:id">
        <Edit />
      </Route> */}

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
