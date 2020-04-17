import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import IDSection from "./IDSection.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

export default function VerifyPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  console.log("key? " + key);
  console.log(key.generateKeyPair());
  console.log(key.exportKey());

  // const keyData = ''

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="certKEEPer"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/bg-white.jpg")}>
        <div className={classes.container}>
          <h1 className={classes.title}>Verify a certificate by its ID</h1>
          <br />
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <IDSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
