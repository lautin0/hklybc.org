import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import { Button, Container } from "react-bootstrap";

// core components

type MainPageHeaderType = {
  page: string,
  subtitle: string,
  bg: number
}

function MainPageHeader(props: MainPageHeaderType) {
  let pageHeader: any = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg" + props.bg + ".jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{props.page}</h1>
            {props.subtitle && <div className="text-center">
              {props.subtitle}
              {/* <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={(e: any) => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button> */}
            </div>}
          </Container>
        </div>
      </div>
    </>
  );
}

MainPageHeader.propTypes = {
  page: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  bg: PropTypes.number
};

export default MainPageHeader;
