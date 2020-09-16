import React, { Component, useEffect } from "react";
import Keycloak from "keycloak-js";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import { getRoles, getUsers } from "./Service/keyCloak";
import { UserIcon } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loggedInUser,
  logout,
} from "./features/loginManagement/loginSlice";

const keyCloakJson = {
  realm: "vraio-client",
  "auth-server-url": "http://192.168.29.72:8180/auth/",
  "ssl-required": "external",
  resource: "client-1",
  "public-client": true,
  "confidential-port": 0,
  clientId: "client-1",
};

export const SecuredTwo = (props) => {
  const user = useSelector(loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("State change occured: ", user);
  }, [user]);

  useEffect(() => {
    const keycloak = new Keycloak(keyCloakJson);

    async function loadUser() {
      await keycloak.loadUserInfo().then((userInfo) => {
        console.log(userInfo);
        dispatch(
          login({
            keycloak: keycloak,
            authenticated: true,
            name: userInfo.name,
            email: userInfo.email,
            id: userInfo.sub,
            avatar: userInfo.avatar,
          })
        );
      });
    }

    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((authenticated) => {
        if (authenticated) {
          loadUser();
        }
      });
  }, []);

  return (
    <React.Fragment>
      {user && user.authenticated && (
        <React.Fragment>
          <p>
            <strong>Name: </strong> {user.name}
          </p>
          <p>
            <strong>Email: </strong> {user.email}
          </p>
          <button type="button" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = new Keycloak({
      realm: "vraio-client",
      "auth-server-url": "http://192.168.29.72:8180/auth/",
      "ssl-required": "external",
      resource: "client-1",
      "public-client": true,
      "confidential-port": 0,
      clientId: "client-1",
    });
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      this.props.setKeycloak(keycloak);
    });
  }

  getUserRoles = async () => {
    let roles = [];
    try {
      roles = await getRoles(this.state.keycloak);
      console.log("Roles: ", roles);
      this.setState({
        response: roles,
      });
    } catch (e) {
      console.error(e);
    }
  };

  getAllUser = async () => {
    let users = [];
    try {
      users = await getUsers(this.state.keycloak);
      console.log("Users: ", users);
      if (Array.isArray(users)) {
        this.setState({
          users: users,
          response: users,
        });
      } else {
        this.setState({
          response: users,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        return (
          <React.Fragment>
            <div className="alert alert-primary mt-3" role="alert">
              This is a Keycloak-secured component of your application. You
              shouldn't be able to see this unless you've authenticated with
              Keycloak.
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
              <div className="w-25">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <div className="clearfix">
                      <strong className="float-left">
                        <UserIcon /> User Information
                      </strong>
                      <Logout
                        className="float-right p-0"
                        keycloak={this.state.keycloak}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <UserInfo
                      keycloak={this.state.keycloak}
                      getUser={this.getAllUser}
                      getRoles={this.getUserRoles}
                    />
                  </div>
                </div>
              </div>
              <div className="w-75 pl-3">
                {this.state.users && (
                  <div className="card shadow-sm mb-3">
                    <div className="card-header">
                      <strong>User List</strong>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Created Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(this.state.users || []).map((user) => {
                              return (
                                <tr key={user.id}>
                                  <td>{user.firstName}</td>
                                  <td>{user.lastName}</td>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    {new Date(
                                      user.createdTimestamp
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.response && (
                  <div className="card shadow-sm mb-3">
                    <div className="card-header">
                      <strong>Response</strong>
                    </div>
                    <div className="card-body">
                      <pre>
                        {JSON.stringify(this.state.response, null, "  ")}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return <div>Unable to authenticate!</div>;
      }
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default Secured;
