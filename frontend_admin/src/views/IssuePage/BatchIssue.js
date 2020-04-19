import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Datetime from "react-datetime";
import courseJsonData from "../../json/course.json";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Success from "components/Typography/Success.js";

// material-ui core components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

const stringHash = require("string-hash");

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

var certIDList = [];

export default function SingleIssue() {
  const classes = useStyles();
  const [courseID, setCourseID] = React.useState("");
  // const [certType, setCertType] = React.useState("");
  const [recipientIDMultiple, setRecipientIDMultiple] = React.useState([]);
  const [certMsg, setCertMsg] = React.useState("");
  const [certDateDay, setCertDateDay] = React.useState("");
  const [certDateMonth, setCertDateMonth] = React.useState("");
  const [certDateYear, setCertDateYear] = React.useState("");
  const [certDate, setCertDate] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [boxStateWaiting, setBoxStateWaiting] = React.useState("none");

  const handleChangeCID = event => {
    setCourseID(event.target.value);
    setRecipientIDMultiple([]);
  };

  const handleChangeMultipleRID = event => {
    setRecipientIDMultiple(event.target.value);
  };

  const handleChangeCertMsg = event => {
    setCertMsg(event.target.value);
  };

  const handleChangeCertDate = date => {
    setCertDateDay(new Date(date).getDate());
    setCertDateMonth(new Date(date).getMonth() + 1);
    setCertDateYear(new Date(date).getFullYear());
    setCertDate(certDateDay + "/" + certDateMonth + "/" + certDateYear);

    console.log("date: " + certDate);
  };

  var course_string = [];
  function setCourseCodeMenuItem() {
    for (var i = 0; i < courseJsonData.length; i++) {
      var obj = courseJsonData[i];
      course_string[i] = obj.course_code;
    }
  }

  var sid_string = [];
  var issuePlatform, course_name, institution, teacher_name;
  function setSIDMenuItem() {
    for (var i = 0; i < courseJsonData.length; i++) {
      var obj = courseJsonData[i];
      if (obj.course_code === courseID) {
        for (var j = 0; j < obj.student.length; j++) {
          sid_string[j] = obj.student[j];
        }
        issuePlatform = "KEEP";
        course_name = obj.course_name;
        institution = obj.institution;
        teacher_name = obj.teacher_name;
      }
    }
  }

  function handleIssueSubmit() {
    console.log("issued clicked");
    setModal(false);
    setBoxStateWaiting("block");
    console.log(recipientIDMultiple);
    issueCert();

    // handleClickOpen();
  }

  async function issueCert() {
    certIDList = [];
    for (var i = 0; i < recipientIDMultiple.length; i++) {
      var RID = recipientIDMultiple[i];
      var certID = recipientIDMultiple[i] + courseID + certMsg + certDate;
      let certID_afterhash = stringHash(certID);

      certIDList[i] = "Org1MSP-" + certID_afterhash;
      let cert = {
        type: "course",
        issuePlatform: issuePlatform,
        institution: institution,
        courseID: courseID,
        courseTitle: course_name,
        teacherName: teacher_name,
        recipientID: JSON.stringify(RID),
        certMsg: certMsg,
        issueDate: certDate,
        signerName: "Irwin",
        signerID: "IK1901"
      };
      console.log(`Request is sent with ${cert}`);
      if (cert !== null) {
        let path = "http://localhost:5000/issue";
        let response = await fetch(path, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            certID: certID_afterhash,
            certContent: cert,
            privateKey:
              "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIzNtjeDq0y9P0\nOVfyX4WOAcKlHWLVwUdNzmYPO6aORpJb1/jlikc7/qQBcviLk6rJbw70HDxk33xj\nd9XCEW3phsgFN0fu3dY4n8FI3pNG/6ghYyS5cG1lHGslzk95k0/f2CLyDU6B9WoL\nY25rusjqEN5KxznYQMbrH4ibI1f9ceYssxdbv02ILt0Ax5Nip0WCa91AUHOtJLBf\nlLm4vLauipyXUVcFQNpm3PD7NFOJU2vZrZuSki08r/d1+W4kptZEMqOnt4HoTkq0\nvEcw5NEHv4a6A+AsLpUfzxdVZotk8vU4+1PIzQaHearJdyCVt14uB9RZRpM2HNTj\nduCX55+zAgMBAAECggEAVRwPeU/CglNKmV+c2UyHjTNNzzJva+6qTF5Jf/dmlzNu\nYaNfCdvcaZ964Gpc0rxaTVrXWbyGFLNtQ7PNVJ6SmcLZEOznfmVkoUeFY1+DyTof\nh1dAf6EZnRu4hqO1p/A6kMRJu5LMTeU5d25DpUHcWumfbs6WxARgy9Pn0OngJ7nZ\nBLXqJrm1lljHApFYuEmuT+uHKQlNnwQULY9PExFAiPCYTDM8Nl1unEDnH9Rgb+EE\npoLR6e/pNUJLQz/KhIMSOxmnnuc3pzCAwSf+xvdXC+HFAvGrHxCHF/O3Zs/Q31pm\nBQ/u7yfyffqvmTPVKvjq3wk/vCWP/Nrh14nfkXNdsQKBgQDi53RD9vNSAw0eXgOS\nTWoAn+yQS96l6B6nc+ZVzN0PMVueoU5JwEZcFWk+ccFCysmuwE01qQ83Ihfew4VT\nO2WwBFqduTDQrLa7lT9kWy+s9wjtZNop3Xfr9I5QR0vI6QFXbfFuMcjECz11YyUL\n05NFkAb6Wc4PNx97gOXujhK2FwKBgQDijH6OHvW1ls36Uv1Cl9f/u2xXu3eot/oB\nm0SMfIYY+N6LRUqn4SekeZnbaXmNC91b7kTy+4oe6259sH1zxLCCAGcHfklwKiK4\nVvqvH+ULjt8tezfsKJmEwvoBVO1KjkWUSYlx/mSNCvXp1ILwxZ+znG99qPCPn2mX\nz1EWWvqAxQKBgQCITC4b0VCR2AFeV2zfyh69p1MLznc8w3T+c3FN4tR7FtQJMq37\nQUNCdx4UA3LqszN5BEycyiO4o4MhLeN9frVziPoBukdnYggWH+3HU7sMtAupxiYC\ndeVeWDXQZTNRyR0kLoeTANavZG0TgW20b/AMHhsC8UUFAMCpiGEV7kOxGwKBgGkQ\nEMzmLLsXAdU6UXtloeVWTQtuxDJ5h7bhA+xG/4VrPQHHk7TBZToQrrqjcpxnyTOO\nD2nEH6zxMB+YDsX2jIjtmNpPxcz/rXRh2gYHO5idnICiKTAbL/7y0TB260jtK/V2\nGQjFmmoSkDLtu//fFo4cWVQkWdOxcS3XFlrQvGWlAoGBAKnFKXYouGUPKw6Kn99s\nly14pJxhlpYGnm3NeZz8VJkxpOdvfPrSfL6W+0ZpnPbnwEBKymZ8R8VDXDIZGo9E\nzE523izoMJ/VRea0CNC7LT4OAJbYP/5dHz0i35rmzpyZM1r7AmVmikgwVqWKzvWN\nc8bsyRkQ7bxPHh0xoN7kVc54\n-----END PRIVATE KEY-----\n"
          })
        });
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
          console.log("Certificates issued");
        }
      }
    }
    setBoxStateWaiting("none");
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function returnCertIDList() {
    var i;
    var string = "";
    for (i = 0; i < certIDList.length; i++) {
      if (i == certIDList.length - 1) {
        string = string + certIDList[i] + ".";
      } else {
        string = string + certIDList[i] + ", ";
      }
    }
    return string;
  }

  return (
    <div>
      <Paper>
        <GridContainer justify="flex-start">
          <GridItem xs={12} sm={12} md={8}>
            <InfoArea
              description=""
              title="Enter the certificate infomation"
              icon={CreateIcon}
              iconColor="info"
            />
          </GridItem>
        </GridContainer>

        <GridItem>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>course ID</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container>
                  <Grid item xs container direction="column" spacing={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={courseID}
                        onChange={handleChangeCID}
                        displayEmpty
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {setCourseCodeMenuItem()}
                        {course_string.map((course_code, index) => (
                          <MenuItem key={index} value={course_code}>
                            {course_code}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider variant="middle" />
              </Grid>
            </Paper>
          </div>
        </GridItem>

        <Typography>
          <br />
        </Typography>

        <GridItem>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>recipient ID</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container>
                  <Grid
                    item
                    container
                    zeroMinWidth
                    direction="column"
                    // spacing={2}
                    wrap="nowrap"
                  >
                    <FormControl className={classes.formControl}>
                      <Select
                        // labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={recipientIDMultiple}
                        onChange={handleChangeMultipleRID}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {setSIDMenuItem()}
                        {sid_string.map(sid => (
                          <MenuItem
                            key={sid}
                            value={sid}
                            // style={getStyles(sid, personName, theme)}
                          >
                            {sid}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </GridItem>

        <Typography>
          <br />
        </Typography>

        <GridItem>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>Personalized Message</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <CustomInput
                    id="message"
                    inputProps={{
                      placeholder: "None",
                      onChange: handleChangeCertMsg
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </GridItem>

        <Typography>
          <br />
        </Typography>

        <GridItem>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>issue date</Typography>
                </Grid>
                <Grid item xs={12} sm={6} container>
                  <FormControl fullWidth>
                    <Datetime
                      inputProps={{
                        placeholder: "None"
                      }}
                      onChange={handleChangeCertDate}
                      timeFormat={false}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </GridItem>

        <Typography>
          <br />
        </Typography>

        {/* modal for confirm action */}
        <GridItem>
          <div>
            <div>
              <Button color="info" round onClick={() => setModal(true)}>
                Issue!
              </Button>
              <Box display={boxStateWaiting}>
                <Grid item xs={12}>
                  <Success>Inserting certificates to hyperledger...</Success>
                </Grid>
              </Box>
            </div>
            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={modal}
              keepMounted
              onClose={() => setModal(false)}
              aria-labelledby="modal-slide-title"
              aria-describedby="modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => setModal(false)}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                {/* <h4 className={classes.modalTitle}>Confirmation of Issue</h4> */}
              </DialogTitle>
              <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
              >
                <h5>Are you sure you want to do this?</h5>
                <h4>Please double confirm the information</h4>
              </DialogContent>
              <DialogActions
                className={
                  classes.modalFooter + " " + classes.modalFooterCenter
                }
              >
                <Button onClick={() => setModal(false)}>Go Back</Button>
                <Button onClick={() => handleIssueSubmit()} color="success">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </GridItem>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Notification
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>Issued.</Typography>
            <Typography gutterBottom>
              The certIDs are {returnCertIDList()}
            </Typography>
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
}
