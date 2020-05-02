import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
import ReCAPTCHA from "react-google-recaptcha";

// @material-ui/icons
import PageviewIcon from "@material-ui/icons/Pageview";
// import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";

// material-ui core components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Radio from "@material-ui/core/Radio";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  // const [selectedEnabled, setSelectedEnabled] = React.useState("a");
  const [input, setInput] = React.useState("");
  // const [cert, setCert] = React.useState(null);
  const [boxState, setBoxState] = React.useState("none");
  const [boxStateError, setBoxStateError] = React.useState("none");
  const [dense] = React.useState(false);
  const [certID, setCertID] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [issuePlatform, setIssuePlatform] = React.useState("");
  const [courseTitle, setCourseTitle] = React.useState("");
  const [teacherName, setTeacherName] = React.useState("");
  const [recipientID, setRecipientID] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [issueDate, setIssueDate] = React.useState("");
  const [org_name, setOrg_name] = React.useState("");
  const [comp_name, setComp_name] = React.useState("");
  const [award, setAward] = React.useState("");
  const [type, setType] = React.useState("");
  const [boxStateInvalidCaptcha, setBoxStateInvalidCaptcha] = React.useState(
    "none"
  );
  const [boxStateDisclose, setBoxStateDisclose] = React.useState("none");
  const [boxStateNotDisclose, setBoxStateNotDisclose] = React.useState("none");

  const recaptchaRef = React.createRef();

  function onChangeCAPTCHA(value) {
    console.log("Captcha value:", value);
    setBoxStateInvalidCaptcha("none");
  }

  const handleChangeInput = event => {
    setInput(event.target.value);
  };

  function handleClick() {
    const recaptchaValue = recaptchaRef.current.getValue();
    // console.log("captcha:" + recaptchaValue);
    if (recaptchaValue === "") {
      setBoxStateInvalidCaptcha("block");
    } else {
      setBoxState("none");
      setBoxStateError("none");
      setBoxStateDisclose("none");
      setBoxStateNotDisclose("none");
      recaptchaRef.current.reset();
      verifyCert();
    }
  }

  async function verifyCert() {
    console.log(`Request is sent with {"certID": ${input}}`);
    if (input !== "") {
      let path = "http://localhost:5000/verify";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          certID: input,
          publicKey:
            "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyMzbY3g6tMvT9DlX8l+F\njgHCpR1i1cFHTc5mDzumjkaSW9f45YpHO/6kAXL4i5OqyW8O9Bw8ZN98Y3fVwhFt\n6YbIBTdH7t3WOJ/BSN6TRv+oIWMkuXBtZRxrJc5PeZNP39gi8g1OgfVqC2Nua7rI\n6hDeSsc52EDG6x+ImyNX/XHmLLMXW79NiC7dAMeTYqdFgmvdQFBzrSSwX5S5uLy2\nroqcl1FXBUDaZtzw+zRTiVNr2a2bkpItPK/3dfluJKbWRDKjp7eB6E5KtLxHMOTR\nB7+GugPgLC6VH88XVWaLZPL1OPtTyM0Gh3mqyXcglbdeLgfUWUaTNhzU43bgl+ef\nswIDAQAB\n-----END PUBLIC KEY-----\n"
        })
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setType(data.cert.content.type);
        setCertID(data.cert.certID);
        setIssuePlatform(data.cert.content.issuePlatform);
        setRecipientID(data.cert.content.recipientID);
        setIssueDate(data.cert.content.issueDate);
        if (data.cert.disclosed === "true") {
          setBoxStateDisclose("block");

          if (data.cert.content.type === "course") {
            setInstitution(data.cert.content.institution);
            setCourseTitle(data.cert.content.courseTitle);
            setTeacherName(data.cert.content.teacherName);
            setMessage(data.cert.content.certMsg);
          } else if (data.cert.content.type === "competition") {
            setComp_name(data.cert.content.competitionName);
            setOrg_name(data.cert.content.organisationName);
            setAward(data.cert.content.award);
          }
          setBoxState("block");
        } else if (data.cert.disclosed === "false") {
          setBoxState("block");
          setBoxStateNotDisclose("block");
        }
      } else {
        setBoxStateError("block");
      }
    }
  }

  function displayData() {
    if (type === "course") {
      // console.log("course");
      return (
        <div className={classes.demo}>
          <List dense={dense}>
            <ListItem>
              <ListItemText primary="Certficate ID" secondary={certID} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Institution" secondary={institution} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Issue Platform"
                secondary={issuePlatform}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Title" secondary={courseTitle} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Teacher Name" secondary={teacherName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="RecipientID" secondary={recipientID} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Message" secondary={message} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Issue Date" secondary={issueDate} />
            </ListItem>
          </List>
        </div>
      );
    } else if (type === "competition") {
      // console.log("comp");
      return (
        <div className={classes.demo}>
          <List dense={dense}>
            <ListItem>
              <ListItemText primary="Certficate ID" secondary={certID} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Organization" secondary={org_name} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Issue Platform"
                secondary={issuePlatform}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="RecipientID" secondary={recipientID} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Competition Name" secondary={comp_name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Award" secondary={award} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Issue Date" secondary={issueDate} />
            </ListItem>
          </List>
        </div>
      );
    }
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <InfoArea
            title="Enter the ID of certificate"
            description=""
            icon={PageviewIcon}
            iconColor="info"
          />
        </GridItem>

        <Grid item xs={12} sm={12} md={8}>
          <CustomInput
            id="certID"
            inputProps={{
              onChange: handleChangeInput
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <form>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Le7HeoUAAAAAL2QVXhFf2V1ONcHH53HcbG9ZV4q"
                onChange={onChangeCAPTCHA}
              />
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box display={boxStateInvalidCaptcha}>
            <Grid item xs={12}>
              <Danger>Invalid CAPTCHA</Danger>
            </Grid>
          </Box>
        </Grid>
        <GridItem>
          <Button type="button" color="info" onClick={handleClick}>
            Submit
          </Button>
        </GridItem>
      </GridContainer>
      <Box display={boxState}>
        <Divider />
        <Paper>
          <InfoArea
            title="Verification Result"
            description=""
            icon={WbIncandescentIcon}
            iconColor="info"
          />
          <div>
            <h4>Result: True</h4>
          </div>
          <Box display={boxStateDisclose}>{displayData()}</Box>
          <Box display={boxStateNotDisclose}>
            <h6>
              The owner of this certificate chose not to disclose the content.
            </h6>
            <h6>Please contact the owner if necessary.</h6>
          </Box>
        </Paper>
      </Box>
      <Box display={boxStateError}>
        <Divider />
        <Paper>
          <InfoArea
            title="Verification Result"
            description=""
            icon={WbIncandescentIcon}
            iconColor="info"
          />
          <div>
            <h4>Result: False</h4>
            <h6>This certificate either not exists or not issued by KEEP</h6>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
