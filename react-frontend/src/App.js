import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Notifications from "react-notify-toast";

import "./App.css";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store/index";

// COMPONENTS
import Navbar from "./components/layout/navbar/Navbar";
import Projects from "./components/projects/Projects";
import Datasets from "./components/datasets/Datasets";
import SingleDataset from "./components/datasets/SingleDataset";
import Landing from "./components/layout/landing/LandingPage";
import Footer from "./components/layout/footer/Footer";
import PageNotFound from "./components/layout/common/404Page";
import DatasetByType from "./components/datasets/DatasetByType";

// ADMIN COMPONENTS
import PrivateRoute from "./components/layout/common/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DatasetTypeAdmin from "./components/datasettype/DatasetTypeAdmin";
import ProjectsAdmin from "./components/projects/ProjectsAdmin";
import DatasetsAdmin from "./components/datasets/DatasetAdmin";
import RequestQueryAdmin from "./components/requestQuery/RequestQueryAdmin";
import GrifFSAdmin from "./components/gridfs/GrifFSAdmin";
import Chartjs2Admin from "./components/chartjs2/Chartjs2Admin";

const main = {
  flex: "1 0 auto"
};

const body = {
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App" style={body}>
            <main className="" style={main}>
              <Navbar />
              <Notifications options={{ zIndex: 200, top: "12 rem" }} />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/datasets/:id" component={Datasets} />
                <Route exact path="/dataset/:id" component={SingleDataset} />
                <Route
                  exact
                  path="/datasettype/:id"
                  component={DatasetByType}
                />
                <Route
                  exact
                  path="/projects/:projectType"
                  component={Projects}
                />
                <PrivateRoute
                  exact
                  path="/admin/register"
                  component={Register}
                />
                <PrivateRoute
                  exact
                  path="/admin/datasettype"
                  component={DatasetTypeAdmin}
                />
                <PrivateRoute
                  exact
                  path="/admin/projects"
                  component={ProjectsAdmin}
                />
                <PrivateRoute
                  exact
                  path="/admin/datasets"
                  component={DatasetsAdmin}
                />
                <PrivateRoute
                  exact
                  path="/admin/requestqueries"
                  component={RequestQueryAdmin}
                />
                <PrivateRoute
                  exact
                  path="/admin/gridfs"
                  component={GrifFSAdmin}
                />
                <PrivateRoute
                  exact
                  path="/admin/chartjs2"
                  component={Chartjs2Admin}
                />
                <Route path="/" component={PageNotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
