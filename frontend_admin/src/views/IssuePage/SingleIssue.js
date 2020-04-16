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

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function SingleIssue() {
  const classes = useStyles();
  const [certID, setCertID] = React.useState("");
  const [courseID, setCourseID] = React.useState("");
  const [recipientID, setRecipientID] = React.useState("");
  const [certMsg, setCertMsg] = React.useState("");
  const [certDateDay, setCertDateDay] = React.useState("");
  const [certDateMonth, setCertDateMonth] = React.useState("");
  const [certDateYear, setCertDateYear] = React.useState("");
  const [certDate, setCertDate] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChangeCertID = event => {
    setCertID(event.target.value);
  };

  const handleChangeCID = event => {
    setCourseID(event.target.value);
  };

  const handleChangeRID = event => {
    setRecipientID(event.target.value);
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
    console.log("issue button clicked");
    setModal(false);
    issueCert();
    // handleClickOpen();
  }

  async function issueCert() {
    let cert = {
      certID: certID,
      issuePlatform: issuePlatform,
      institution: institution,
      courseID: courseID,
      courseTitle: course_name,
      teacherName: teacher_name,
      recipientID: recipientID,
      certMsg: certMsg,
      issueDate: certDate,
      signature: signature
    };
    console.log(`Request is sent with ${cert}`);
    console.log(typeof JSON.stringify(recipientID));
    console.log(typeof recipientID);
    if (cert !== null) {
      let path = "http://localhost:5000/issue";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cert: cert,
          recipientID: JSON.parse(recipientID)
        })
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("Certificates issued");
      }
    }
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper>
        <GridContainer justify="flex-start">
          <GridItem xs={12} sm={12} md={8}>
            <InfoArea
              title="Enter the certificate infomation"
              description=""
              icon={CreateIcon}
              iconColor="info"
            />
          </GridItem>
        </GridContainer>

        <GridItem>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>certificate ID</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <CustomInput
                    id="certid"
                    inputProps={{
                      placeholder: "None",
                      onChange: handleChangeCertID
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
            <Paper className={classes.paper} m={2}>
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
                  <Grid item xs container direction="column" spacing={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={recipientID}
                        onChange={handleChangeRID}
                        displayEmpty
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {setSIDMenuItem()}
                        {sid_string.map((sid, index) => (
                          <MenuItem key={index} value={sid}>
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
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
}
