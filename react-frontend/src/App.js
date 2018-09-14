import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Notifications from "react-notify-toast";

import "./App.css";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store/index";

// COMPONENTS
import Navbar from "./components/layout/navbar/Navbar";

// ADMIN COMPONENTS
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Notifications options={{ zIndex: 200, top: "12 rem" }} />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin/register" component={Register} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
