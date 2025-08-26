import { Button, Typography } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";
import { AppUserContext } from "../contexts/AppUserContext";
import { useContext, useState } from "react";
import httpService from "../httpService";
import { Logout } from "@mui/icons-material";

function NavbarComponent() {
  const { appUser } = useContext(AppUserContext);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    const { data } = await httpService(`auth/logout`);
    if (data) {
      window.location.href = "/";
    }
    setLoading(false);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width={30}
            height={30}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
          <span
            style={{ fontWeight: "bold", fontSize: "15px", color: "#26667F" }}
          >
            RCCG NLA
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {appUser && (
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Item>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  onClick={logout}
                  endIcon={<Logout />}
                  loadingPosition="end"
                  loading={loading}
                  color="error"
                >
                  Logout
                </Button>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
