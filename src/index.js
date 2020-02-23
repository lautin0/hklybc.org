
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import LoginPage from "views/examples/LoginPage.js";
import MainPage from 'views/main/MainPage.js'
import CommonModal from "components/Modals/CommonModal";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

const history = createHistory({ basename: process.env.PUBLIC_URL });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <CommonModal />
    <LoadingOverlay />
    <Router history={history}>
      <Switch>
        <Switch>
          <Route path="/index" render={props => <Index {...props} />} />
          <Route path="/download" render={props => <MainPage {...props} page="download" />} />
          <Route path="/apply-activity" render={props => <MainPage {...props} page="apply-activity" />} />
          <Route path="/about-us" render={props => <MainPage {...props} page="about-us" />} />
          <Route path="/contact-us" render={props => <MainPage {...props} page="contact-us" />} />
          <Route path="/sunday-service-info" render={props => <MainPage {...props} page="sunday-service-info" />} />
          <Route path="/test" render={props => <MainPage {...props} page="test" />} />
          <Route path="/login-page" render={props => <LoginPage {...props} />} />
          <Redirect to="/index" />
          <Redirect from="/" to="/index" />
        </Switch>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
