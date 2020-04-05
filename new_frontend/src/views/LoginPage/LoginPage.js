import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
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

import image from "assets/img/bg-white.jpg";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [wallet, setWallet] = React.useState(null);
  const [walletFile, setWalletFile] = React.useState(null);

  const importWallet = async () => {
    // if (event.target.files[0] !== undefined) {
    //     this.setState({ walletFile: event.target.files[0] }, () => {
    //         const reader = new FileReader();
    //         reader.readAsText(this.state.walletFile, "UTF-8");
    //         reader.onload = (event) => {
    //             let wallet = JSON.parse(event.target.result)
    //             this.setState({ wallet:  wallet});
    //             window.sessionStorage.setItem("wallet", JSON.stringify(wallet));
    //         }
    //         reader.onerror = (event) => {
    //             alert('Fail to read walle file')
    //         }
    //     });
    // }
    console.log(walletFile);
    const reader = new FileReader();
    reader.readAsText(walletFile, "UTF-8");
    reader.onload = (event) => {
      let wallett = JSON.parse(event.target.result)
      this.setWallet(wallett);
      window.sessionStorage.setItem("wallet", JSON.stringify(wallet));
    }
    reader.onerror = (event) => {
        alert('Fail to read walle file')
  }
  }

  const renderWallet = event => {
    console.log("file changed");
    console.log(typeof(event.target.files[0]));
    console.log(event.target.files[0]);
    
    setWalletFile(event.target.files[0]);
    console.log("ahhhhh  " + walletFile);

    // if (walletFile !== null) {
    //     return (
    //         <p>Login Success</p>
    //     );
    // }
    // else{
    //     return(
    //         <input onChange={importWallet} type="file" />
    //     );
    // }
    // importWallet();
}

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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <div>
                      <Button color="transparent">
                        Login through KEEP
                        <SchoolIcon />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>
                    {/* Or Login by registered info on KEEP */}
                    Or Register <a href="/register-page">here</a>
                  </p>
                  <CardBody>
                    {/* <Button inputProps={type: file}>Upload wallet.json here
                    </Button> */}
                    <Button
                      variant="contained"
                      component="label"
                    >
                      Upload wallet.json here
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={renderWallet}
                      />
                    </Button>
                    {/* <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> */}
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
                    <Button simple color="primary" size="lg">
                      Login
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
