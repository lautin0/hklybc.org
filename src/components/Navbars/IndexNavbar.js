import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" style={{background: '#45934c'}}>
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="#pablo"
              id="navbar-brand"
              onClick={e => {
                e.preventDefault();
                window.scrollTo(0, 0);
              }}
            >
              綠楊浸信會
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              回頂頁
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-map-signs mr-1"></i>
                  <p>教會活動</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    最新活動
                  </DropdownItem>
                  <DropdownItem to="/apply-activity" tag={Link}>
                    活動報名
                  </DropdownItem>
                  <DropdownItem>
                    團契
                  </DropdownItem>
                  <DropdownItem>
                    點滴回顧
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    // document
                    //   .getElementById("sunday-service-info-section")
                    //   .scrollIntoView();
                  }}
                >
                  <i className="fas fa-hammer"></i>
                  <p>事工介紹</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-book mr-1"></i>
                  <p>教會刊物</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/download" tag={Link}>
                    教會月刊
                  </DropdownItem>
                  <DropdownItem
                    target="_blank"
                  >
                    見證欄
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-info mr-2"></i>
                  <p>認識綠楊</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/about-us" tag={Link}>
                    關於我們
                  </DropdownItem>
                  <DropdownItem
                    target="_blank"
                    onClick={e => {
                      e.preventDefault();
                      document
                        .getElementById("sunday-service-info-section")
                        .scrollIntoView();
                    }}
                  >
                    聚會時間
                  </DropdownItem>
                  <DropdownItem
                    target="_blank"
                    onClick={e => {
                      e.preventDefault();
                      document
                        .getElementById("contact-us-section")
                        .scrollIntoView();
                    }}
                  >
                    聯絡我們
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  // color="success"
                  href="#pablo"
                  id="login"
                  to="/login-page"
                  tag={Link}
                  style={{color: 'rgb(69, 147, 76)'}}
                >
                  <i className="fas fa-user" style={{fontSize: 14}}></i>
                  <p>會友登入</p>
                </Button>
                {/* <UncontrolledTooltip target="#login">
                  立刻登入!
                </UncontrolledTooltip> */}
              </NavItem>
              {/* <NavItem>
                <NavLink
                  href="#"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem> */}
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/lukYeungBaptistChurch"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/lybc1997"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
