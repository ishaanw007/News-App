// import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            height={4}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="General"
                  pageSize={6}
                  country={"in"}
                  category="General"
                ></News>
              }
            ></Route>

            <Route
              exact
              path="/Business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Business"
                  pageSize={6}
                  country={"us"}
                  category="Business"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/Entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Entertainment"
                  pageSize={6}
                  country={"us"}
                  category="Entertainment"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/General"
              element={
                <News
                  setProgress={this.setProgress}
                  key="General"
                  pageSize={6}
                  country={"us"}
                  category="General"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/Health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Health"
                  pageSize={6}
                  country={"us"}
                  category="Health"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Science"
                  pageSize={6}
                  country={"us"}
                  category="Science"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/Sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Sports"
                  pageSize={6}
                  country={"us"}
                  category="Sports"
                ></News>
              }
            ></Route>
            <Route
              path="/Technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Technology"
                  pageSize={6}
                  country={"us"}
                  category="Technology"
                ></News>
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
