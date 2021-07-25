import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Destination from "./components/Destination/Destination";
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import NoMatch from './components/NoMatch/NoMatch';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext()

function App() {
  const [userInfo, setUserInfo]= useState({})
  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <PrivateRoute path="/destination/:rider">
          <Header></Header>
          <Destination></Destination>
        </PrivateRoute>
        <PrivateRoute path="/destination/">
          <Header></Header>
          <Destination></Destination>
        </PrivateRoute>
        <Route path="/login">
          <Header></Header>
          <Login></Login>
        </Route>
        <Route path="*">
          <NoMatch></NoMatch>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
