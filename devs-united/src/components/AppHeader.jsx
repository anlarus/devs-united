import {Link} from "react-router-dom"

const AppHeader = ()=> {
    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link
          clLinkssName="App-link"
          to="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Link>
      </header>   
    )
}

export default AppHeader