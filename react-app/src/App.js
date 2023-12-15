import logo from './logo.svg';
import './App.css';
import Routers from "./router/router"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
