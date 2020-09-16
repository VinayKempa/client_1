import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import MiniUser from "./MiniUser";
import { UserIcon } from "./Icons";
import { getAppName } from "./Service/general";
import { logout, loggedInUser } from "./features/loginManagement/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Banner = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [appName, setAppName] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);

  useEffect(() => {
    async function fetchData() {
      let manifest = await getAppName();
      setAppName(manifest.short_name);
    }
    console.log("User: ", user);
    fetchData();
  }, []);

  const handleLogout = () => {
    props.history.push("/");
    props.keycloak.logout();
    //dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">{appName}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Public</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/secured">Secured</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {props && props.keycloak && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <UserIcon />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>
                  <MiniUser keycloak={props.keycloak} />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout} className="text-center">
                  <span className="badge badge-danger">Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default withRouter(Banner);
