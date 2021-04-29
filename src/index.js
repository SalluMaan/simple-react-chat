import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./component/login/login";
import Signup from "./component/signup/signup";
import Dashboard from "./component/dashboard/dashboard";

var firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDp0c4HZSIOoVl9vSZts1LPsZ_b6_xOLfU",
  authDomain: "chat-app-1330b.firebaseapp.com",
  databaseURL: "https://chat-app-1330b.firebaseio.com",
  projectId: "chat-app-1330b",
  storageBucket: "chat-app-1330b.appspot.com",
  messagingSenderId: "307963326889",
  appId: "1:307963326889:web:6f6573bbe3190ab0b994b8",
  measurementId: "G-F3R6X7QMEK",
});

const routing = (
  <Router>
    <div className="" id="routing-container">
      <Route path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
