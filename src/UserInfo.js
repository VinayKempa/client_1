import React, { Component } from "react";
import { getRoles, getUsers } from "./Service/keyCloak";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      avatar: "",
    };
  }

  componentDidMount() {
    console.log(this.props.keycloak);
    console.log(this.props.keycloak.hasRealmRole("pos-admin-role"));
    console.log(this.props.keycloak.hasResourceRole("test-me-role"));
    this.props.keycloak.loadUserInfo().then((userInfo) => {
      console.log(userInfo);
      this.setState({
        name: userInfo.name,
        email: userInfo.email,
        id: userInfo.sub,
        avatar: userInfo.avatar,
      });
    });
    //this.props.keycloak.has
  }

  getUserRoles = async () => {
    let roles = [];
    try {
      roles = await getRoles(this.props.keycloak);
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
      users = await getUsers(this.props.keycloak);
      console.log("Users: ", users);
      this.setState({
        users: users,
        response: users,
      });
    } catch (e) {
      console.error(e);
    }
  };

  refreshToken = () => {
    this.props.keycloak
      .updateToken(1)
      .then(function (refreshed) {
        if (refreshed) {
          alert("Token was successfully refreshed");
        } else {
          alert("Token is still valid");
        }
      })
      .catch(function () {
        alert("Failed to refresh the token, or the session has expired");
      });
  };

  render() {
    return (
      <div className="UserInfo">
        <div className="row">
          <div className="col-12 text-center">
            <img
              src={this.state.avatar}
              className="img-thumbnail rounded "
              alt="User Avatar"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div className="col-12">
            <p className="text-center">
              <strong>{this.state.name}</strong>
            </p>
            <p>{this.state.email}</p>
            <p>{this.state.id}</p>
            <button
              onClick={this.props.getRoles}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Get Roles
            </button>{" "}
            <button
              onClick={this.props.getUser}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Get Users
            </button>{" "}
            <button
              onClick={this.refreshToken}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Refresh Token
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.users && (
              <table>
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
                          {new Date(user.createdTimestamp).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {this.state.response && (
              <pre>{JSON.stringify(this.state.response, null, "  ")}</pre>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default UserInfo;

let SAMPLE = {
  Req: {
    Parameters: {
      Param: [
        {
          Name: "ACTION",
          Value: "CREATE_OWNER",
        },
        {
          Name: "OWNER_NAME",
          Value: "magnificient",
        },
        {
          Name: "TYPE_OF_OWNER",
          Value: "6",
        },
        {
          Name: "EMAIL",
          Value: "test@gmail.com",
        },
        {
          Name: "STATUS",
          Value: "0",
        },
        {
          Name: "FAX_NUMBER",
          Value: "24",
        },
        {
          Name: "WEB_URL",
          Value: "www.gmail.com",
        },
        {
          Name: "MOBILE_NUMBER",
          Value: "9999999999",
        },
        {
          Name: "ADDRESS_LINE_1",
          Value: "5200 Lackawanna Blvd",
        },
        {
          Name: "ADDRESS_LINE_2",
          Value: "Charleston County,South Carolina",
        },
        {
          Name: "ADDRESS_LINE_3",
          Value: "North Charleston",
        },
        {
          Name: "ADDRESS_LINE_4",
          Value: "South Carolina",
        },
        {
          Name: "ADDRESS_LINE_5",
          Value: "29405",
        },
        {
          Name: "STORE_ID",
          Value: "5499",
        },
        {
          Name: "PER_PAGE_COUNT",
          Value: "10",
        },
        {
          Name: "CURRENT_PAGE",
          Value: "1",
        },
      ],
      user: {
        mvnoID: "200",
        userId: 1,
      },
    },
    TxnId: "658335840809257",
    Feature: "CREATE_OWNER_API",
  },
};
