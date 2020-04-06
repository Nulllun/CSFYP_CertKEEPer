import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Datetime from "react-datetime";
import PropTypes from "prop-types";
import jsonData from "../../json/course.json";

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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function InfoSection() {
  const classes = useStyles();
  const [courseID, setCourseID] = React.useState("");
  const [recipientID, setRecipientID] = React.useState("");
  const [certType, setCertType] = React.useState("");

  const handleChangeCID = event => {
    setCourseID(event.target.value);
  };

  const handleChangeRID = event => {
    setRecipientID(event.target.value);
  };

  const handleChangeCertType = event => {
    setCertType(event.target.value);
  };

  const [modal, setModal] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var course_string = [];
  function setCourseCodeMenuItem() {
    for (var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      course_string[i] = obj.course_code;
    }
  }

  var sid_string = [];
  function setSIDMenuItem() {
    console.log("is ok " + courseID);
    for (var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      if (obj.course_code == courseID) {
        console.log("ywy = " + obj.student);
        for (var j = 0; j < obj.student.length; j++)
          sid_string[j] = obj.student[j];
      }
    }
  }

  return (
    <div className={classes.section}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Single" {...a11yProps(0)} />
        <Tab label="Batch" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
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
                      // inputProps={{
                      //   placeholder: "Regular"
                      // }}
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
                    <Typography>issue date and time</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <FormControl fullWidth>
                      <Datetime inputProps={{ placeholder: "None" }} />
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
                  <Button onClick={() => setModal(false)} color="success">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </GridItem>
        </Paper>
      </TabPanel>

      {/* second tab */}
      <TabPanel value={value} index={1}>
        <Paper>
          <GridContainer justify="flex-start">
            <GridItem xs={12} sm={12} md={8}>
              <InfoArea
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
                          <MenuItem value={2100}>CSCI2100</MenuItem>
                          <MenuItem value={3310}>CSCI3310</MenuItem>
                          <MenuItem value={1110}>PHYS1110</MenuItem>
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
                          <MenuItem value={1}>1155090001</MenuItem>
                          <MenuItem value={2}>1155090002</MenuItem>
                          <MenuItem value={3}>1155090003</MenuItem>
                          <MenuItem value={4}>1155090004</MenuItem>
                          <MenuItem value={5}>1155090005</MenuItem>
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
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>certificate type</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <Grid item xs container direction="column" spacing={2}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={certType}
                          onChange={handleChangeCertType}
                          displayEmpty
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Distinction</MenuItem>
                          <MenuItem value={2}>Merit</MenuItem>
                          <MenuItem value={3}>Pass</MenuItem>
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
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>issue date and time</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} container>
                    <FormControl fullWidth>
                      <Datetime inputProps={{ placeholder: "None" }} />
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
                  <Button onClick={() => setModal(false)} color="success">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </GridItem>
        </Paper>
      </TabPanel>
    </div>
  );
}
