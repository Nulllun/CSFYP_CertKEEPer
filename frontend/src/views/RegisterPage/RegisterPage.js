import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import SchoolIcon from "@material-ui/icons/School";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import WorkIcon from "@material-ui/icons/Work";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Primary from "components/Typography/Primary.js";
// material-ui components

import image from "assets/img/bg-white.jpg";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [userID, setUserID] = React.useState("");

  const registerUser = async () => {
    // const userID = { userID };
    console.log(`Request is sent with {"userID": ${userID}}`);
    console.log({ userID });

    if (userID !== "") {
      let path = "http://localhost:5000/register";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: userID
        })
      });
      let wallet = await response.json();
      if (response.status === 200) {
        console.log("response status == 200");
        downloadWallet(wallet);
      } else {
        console.log("response status != 200");
      }
      console.log(wallet);
      // document.body.innerHTML += '<br/><p style="background-color:#FFFFFF">wallet.json file is downloaded actomactically. Please save it in a location you would remember as you will need this to login into CertKEEPer.</p>';
    } else {
      // document.body.innerHTML += '<br/><p style="background-color:#FFFFFF">ID is null or has been registered. Please enter a new one.</p>'
      console.log("empty userid");
    }
  };

  const downloadWallet = wallet => {
    console.log("download wallet");

    const walletString = JSON.stringify(wallet);
    const element = document.createElement("a");
    const file = new Blob([walletString], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "wallet.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleChangeUserID = event => {
    console.log("change userid");
    setUserID(event.target.value);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Login"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary">Register</CardHeader>
                  {/* <p className={classes.divider}>
                    Or Login by registered info on KEEP
                  </p> */}
                  <CardBody>
                    <Primary>Personal Particulars</Primary>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <RecentActorsIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Occupation"
                      id="occupation"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <WorkIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Institute"
                      id="institute"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <SchoolIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Major"
                      id="major"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <SchoolIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Year"
                      id="year"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <SchoolIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Primary>Login Information</Primary>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <VpnKeyIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: handleChangeUserID
                      }}
                    />
                    {/* <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    /> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={registerUser}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
