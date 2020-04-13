import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// @material-ui/icons
import PageviewIcon from "@material-ui/icons/Pageview";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.js";

// material-ui core components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const [selectedEnabled, setSelectedEnabled] = React.useState("a");
  const [input, setInput] = React.useState("");
  // const [cert, setCert] = React.useState(null);
  const [verifyResult, setVerifyResult] = React.useState(false);
  const [verificationResultText, setVerificationResultText] = React.useState(
    "False"
  );
  const [boxState, setBoxState] = React.useState("none");
  const [dense] = React.useState(false);
  const [certID, setCertID] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [issuePlatform, setIssuePlatform] = React.useState("");
  const [courseTitle, setCourseTitle] = React.useState("");
  const [teacherName, setTeacherName] = React.useState("");
  const [recipientID, setRecipientID] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [issueDate, setIssueDate] = React.useState("");

  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );

  const handleChangeInput = event => {
    setInput(event.target.value);
  };

  function handleClick() {
    console.log("clicked");
    console.log(input);
    setBoxState("none");
    verifyCert();
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
          certID: input
        })
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // setCert(data.cert);
        setVerifyResult(data.verifyResult);
        setCertID(data.cert.certID);
        setInstitution(data.cert.institution);
        setIssuePlatform(data.cert.issuePlatform);
        setCourseTitle(data.cert.courseTitle);
        setTeacherName(data.cert.teacherName);
        console.log(typeof data.cert.recipientID);
        setRecipientID(data.cert.recipientID);
        setMessage(data.cert.certMsg);
        setIssueDate(data.cert.issueDate);
        setBoxState("block");
      }
    }
  }

  const getResult = () => {
    if (verifyResult) {
      setVerificationResultText("True");
    } else {
      // setVerificationResultText("False");

      // signature part hasnt solved
      setVerificationResultText("True");
    }
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <InfoArea
            title="Enter the ID of certificate / URL"
            description=""
            icon={PageviewIcon}
            iconColor="info"
          />
        </GridItem>
        <GridItem>
          <CustomInput
            id="certID"
            inputProps={{
              onChange: handleChangeInput
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === "a"}
                    onChange={() => setSelectedEnabled("a")}
                    value="a"
                    name="radio button enabled"
                    aria-label="A"
                    icon={
                      <FiberManualRecord className={classes.radioUnchecked} />
                    }
                    checkedIcon={
                      <FiberManualRecord className={classes.radioChecked} />
                    }
                    classes={{
                      checked: classes.radio
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="ID of certificate"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === "b"}
                    onChange={() => setSelectedEnabled("b")}
                    value="b"
                    name="radio button enabled"
                    aria-label="B"
                    icon={
                      <FiberManualRecord className={classes.radioUnchecked} />
                    }
                    checkedIcon={
                      <FiberManualRecord className={classes.radioChecked} />
                    }
                    classes={{
                      checked: classes.radio
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="URL"
              />
            </div>
          </Grid>
        </GridContainer>
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
            {getResult}
            <h4>Result: {verificationResultText}</h4>
          </div>
          <div className={classes.demo}>
            <List dense={dense}>
              <ListItem>
                <ListItemText
                  primary="Certficate ID"
                  secondary={certID}
                  // secondary="CERT-2100-01"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Institution"
                  secondary={institution}
                  // secondary="CUHK"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Issue Platform"
                  secondary={issuePlatform}
                  // secondary="KEEP"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Title"
                  secondary={courseTitle}
                  // seconday="CSCI2100"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Teacher Name"
                  secondary={teacherName}
                  // secondary="Prof. Irwin King"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="RecipientID"
                  secondary={recipientID}
                  // secondary="1155091234"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Message"
                  secondary={message}
                  // secondary="C+"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Issue Date"
                  secondary={issueDate}
                  // secondary="1/4/2020"
                />
              </ListItem>
            </List>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
