import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends Component {

  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
  }

  render() {
    return (
      <button onClick={ () => this.logout() } className={`btn btn-link ${this.props.className}`}>
        Logout
      </button>
    );
  }
}
export default withRouter(Logout);