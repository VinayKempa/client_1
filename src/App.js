import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Banner from "./Banner";
import Welcome from "./Welcome";
import Secured, { SecuredTwo } from "./Secured";
import "./App.scss";

const App = () => {
  const [keycloak, setKeycloak] = useState(null);
  return (
    <BrowserRouter>
      <Banner keycloak={keycloak} />
      <div className="container-fluid">
        <Route exact path="/" component={Welcome} />
        <Route path="/secured">
          {/* <SecuredTwo /> */}
          <Secured setKeycloak={setKeycloak} />
        </Route>
      </div>
    </BrowserRouter>
  );
};
export default App;
