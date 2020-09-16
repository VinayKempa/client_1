import React from "react";
import { NavLink } from "react-router-dom";
import Toggle from "./Toggle";

const Welcome = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-5">Welcome</h2>
      <div className="alert alert-light" role="alert">
        This guide helps you practice using Keycloak to evaluate it before you
        use it in a production environment. It includes instructions for
        installing the Keycloak server in standalone mode, creating accounts and
        realms for managing users and applications, and securing a WildFly
        server application.
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <NavLink to="/secured">Click here to Login</NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Toggle valueOff="OFF" valueOn="ON" valueDefault="ON" /> {" - "}{" "}
          <Toggle valueOff="N" valueOn="Y" valueDefault="Y" disabled />
        </div>
        <div className="col-12 text-center">
          <Toggle rounded /> {" - "} <Toggle rounded disabled />
        </div>
      </div>
    </div>
  );
};
export default Welcome;
