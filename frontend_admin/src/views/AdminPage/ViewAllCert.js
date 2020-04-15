import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Page,
  Text,
  Image,
  // View,
  Document,
  StyleSheet,
  // Font,
  PDFDownloadLink
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
// import jsonData from "../../json/cert.json";
import keepLogo from "../../assets/img/keep_logo.png";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Close from "@material-ui/icons/Close";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// import component from "@material-ui/core
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var course_name,
  course_code,
  institute,
  certID,
  teacher_name,
  message,
  date,
  recipient_id,
  targetButton,
  pdfname;

export default function ViewAllCert() {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [dlButtonVisibility, setDlButtonVisibility] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [course_name_edit, setCourse_name_edit] = React.useState("");
  const [course_code_edit, setCourse_code_edit] = React.useState("");
  const [institution_edit, setInstitution_edit] = React.useState("");
  const [certID_edit, setCertID_edit] = React.useState("");
  const [teacher_name_edit, setTeacher_name_edit] = React.useState("");
  const [date_edit, setDate_edit] = React.useState("");
  const [certDescription_edit, setCertDescription_edit] = React.useState("");
  const [issuePlatform_edit, setIssuePlatform_edit] = React.useState("");
  const [activeModal, setActiveModal] = React.useState(null);
  const [certList, setCertList] = React.useState([]);
  const [recipientID, setRecipientID] = React.useState("");
  const [searchField, setSearchField] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState(2);

  const handleChangeRecipientID = event => {
    setRecipientID(event.target.value);
  };

  const handleChangeSearchField = event => {
    setSearchField(event.target.value);
  };

  const handleChangeCourseName = event => {
    setCourse_name_edit(event.target.value);
  };

  const handleChangeCourseCode = event => {
    setCourse_code_edit(event.target.value);
  };

  const handleChangeInstitution = event => {
    setInstitution_edit(event.target.value);
  };

  const handleChangeTeacherName = event => {
    setTeacher_name_edit(event.target.value);
  };

  const handleChangeCertDescription = event => {
    setCertDescription_edit(event.target.value);
  };

  const handleChangeCertID = event => {
    setCertID_edit(event.target.value);
  };

  const handleChangeDate = event => {
    setDate_edit(event.target.value);
  };

  const handleChangeIssuePlatform = event => {
    setIssuePlatform_edit(event.target.value);
  };

  const handleChangeSearchBy = event => {
    setSearchBy(event.target.value);
  };

  async function getCert() {
    let input = searchField;
    if (input !== undefined && input !== null) {
      if (searchBy == 1) {
        console.log("certid");
        let path = "http://localhost:5000/view";
        let response = await fetch(path, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            searchBy: JSON.parse(1),
            certID: input
          })
        });
        let certList = await response.json();
        console.log(certList);
        if (response.status === 200) {
          setCertList(certList);
        }
      } else if (searchBy == 2) {
        console.log("rid");
        let path = "http://localhost:5000/view";
        let response = await fetch(path, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            searchBy: JSON.parse(2),
            recipientID: JSON.parse(input)
          })
        });
        let certList = await response.json();
        console.log(certList);
        if (response.status === 200) {
          setCertList(certList);
        }
      } else {
        console.log("date");
        let path = "http://localhost:5000/view";
        let response = await fetch(path, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            searchBy: JSON.parse(3),
            issueDate: input
          })
        });
        let certList = await response.json();
        console.log(certList);
        if (response.status === 200) {
          setCertList(certList);
        }
      }
    }
  }

  async function issueCert() {
    let cert = {
      certID: certID_edit,
      issuePlatform: issuePlatform_edit,
      institution: institution_edit,
      courseID: course_code_edit,
      courseTitle: course_name_edit,
      teacherName: teacher_name_edit,
      recipientID: recipientID,
      certMsg: certDescription_edit,
      issueDate: date_edit,
      signature: ""
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
          cert: cert,
          recipientID: JSON.parse(recipientID)
        })
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("Certificates re-issued");
        getCert();
      }
    }
  }

  const PDFstyle = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    title: {
      fontSize: 24,
      textAlign: "center"
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40
    },
    logo: {
      width: 250
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey"
    },
    line: {
      fontSize: 12,
      color: "grey"
    }
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={PDFstyle.body}>
        <Image style={PDFstyle.logo} src={keepLogo} />
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>This is to certify that</Text>
        <Text style={PDFstyle.title}>Chris Wong</Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>
          successfuly completed and received {message} in
        </Text>
        <Text style={PDFstyle.title}>
          {course_code}: {course_name}
        </Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>in</Text>
        <Text style={PDFstyle.header}>{institute}</Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.line}>__________________</Text>
        <Text style={PDFstyle.line}> </Text>
        <Text style={PDFstyle.line}>{teacher_name}</Text>
        <Text style={PDFstyle.line}> </Text>
        <Text style={PDFstyle.line}>{date}</Text>
      </Page>
    </Document>
  );

  const App = () => (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName={pdfname}>
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );

  function genPDF() {
    console.log("generating PDF");
    pdfname = certID + ".pdf";
    const rootElement = document.getElementById(targetButton);
    ReactDOM.render(<App />, rootElement);
  }

  // var jsonobject_string = [];
  // function getJsonObject() {
  //   for (var i = 0; i < jsonData.length; i++) {
  //     var obj = jsonData[i];
  //     jsonobject_string[i] = obj;
  //   }
  // }

  const setCertValue = obj => {
    course_name = obj.courseTitle;
    course_code = obj.courseID;
    institute = obj.institution;
    certID = obj.certID;
    teacher_name = obj.teacherName;
    message = obj.certMsg;
    date = obj.issueDate;
    targetButton = "button" + obj.certID;

    // console.log(targetButton);

    genPDF();
    setDlButtonVisibility(false);
  };

  function buttonID(obj) {
    return "button" + obj.certID;
  }

  // React.useEffect(() => {
  //   console.log("Do something after counter has changed", course_name_edit);
  // }, [course_name_edit]);

  const editCert = obj => {
    setActiveModal(obj.certID);
    setTimeout(function() {
      setModal(true);
    }, 1000);
    presetEditCertValue(obj);
  };

  function closeAction(obj) {
    console.log("close modal");
    presetEditCertValue(obj);
    console.log(obj.institution);
    console.log(institution_edit);
    setModal(false);
    setActiveModal(null);
  }

  function confirmEditAction() {
    console.log("confirm edit certificate");
    setModal(false);
    setActiveModal(null);
    issueCert();
  }

  function deleteCert() {
    console.log("delete certificate");
    // need implement
  }

  function presetEditCertValue(obj) {
    console.log("setting...");
    setCertID_edit(obj.certID);
    setInstitution_edit(obj.institution);
    setCourse_code_edit(obj.courseID);
    setCourse_name_edit(obj.courseTitle);
    setTeacher_name_edit(obj.teacherName);
    setCertDescription_edit(obj.certMsg);
    setDate_edit(obj.issueDate);
    setIssuePlatform_edit(obj.issuePlatform);
    setRecipientID(obj.recipientID);
  }

  return (
    <div className={classes.section}>
      <div>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Search by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchBy}
                  onChange={handleChangeSearchBy}
                >
                  <MenuItem value={1}>Certificate ID</MenuItem>
                  <MenuItem value={2}>Student ID</MenuItem>
                  <MenuItem value={3}>Issue Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <CustomInput
                id="searchCriteria"
                labelText="Enter here"
                inputProps={{
                  fullWidth: true,
                  onChange: handleChangeSearchField
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button color="info" round onClick={() => getCert()}>
                Query
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>
        {certList.map(obj => (
          <div key={obj.certID}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {obj.certID} - issued on: {obj.issueDate}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12} md={6}>
                  <div className={classes.demo}>
                    <List dense={dense}>
                      <ListItem>
                        <ListItemText
                          primary="Certficate ID"
                          secondary={obj.certID}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Institution"
                          secondary={obj.institution}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Issue Platform"
                          secondary={obj.issuePlatform}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Student ID"
                          secondary={obj.recipientID}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Course ID"
                          secondary={obj.courseID}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Course Title"
                          secondary={obj.courseTitle}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Teacher Name"
                          secondary={obj.teacherName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Certificate Description"
                          secondary={obj.certMsg}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Issue Date"
                          secondary={obj.issueDate}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Box>
                  <Grid container direction={"row"} spacing={1}>
                    <Grid container item xs={12} sm={12}>
                      <Grid>
                        <Button
                          // id={buttonID(obj)}
                          color="warning"
                          round
                          onClick={() => setCertValue(obj)}
                        >
                          Generate PDF
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          id={buttonID(obj)}
                          color="warning"
                          disabled={dlButtonVisibility}
                          round
                        >
                          Not Ready
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12}>
                      <Grid>
                        <Button
                          // id={buttonID(obj)}
                          color="success"
                          round
                          onClick={() => editCert(obj)}
                        >
                          Edit
                        </Button>
                        <Dialog
                          classes={{
                            root: classes.center,
                            paper: classes.modal
                          }}
                          fullWidth={true}
                          open={activeModal == obj.certID}
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
                              onClick={() => closeAction(obj)}
                            >
                              <Close className={classes.modalClose} />
                            </IconButton>
                            <h4 className={classes.modalTitle}>
                              Edit certificate&apos;s data
                            </h4>
                          </DialogTitle>
                          <DialogContent
                            id="modal-slide-description"
                            className={classes.modalBody}
                          >
                            <TextField
                              required
                              id="filled-disabled"
                              variant="filled"
                              label="Certificate ID"
                              inputProps={{
                                disabled: true
                              }}
                              fullWidth
                              defaultValue={obj.certID}
                              onChange={handleChangeCertID}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Institution"
                              fullWidth
                              defaultValue={obj.institution}
                              onChange={handleChangeInstitution}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Issue Platform"
                              fullWidth
                              defaultValue={obj.issuePlatform}
                              onChange={handleChangeIssuePlatform}
                            />
                            <TextField
                              required
                              id="filled-disabled"
                              variant="filled"
                              label="Recipient ID"
                              inputProps={{
                                disabled: true
                              }}
                              fullWidth
                              defaultValue={obj.recipientID}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Course Code"
                              fullWidth
                              defaultValue={obj.courseID}
                              onChange={handleChangeCourseCode}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Course Name"
                              fullWidth
                              defaultValue={obj.courseTitle}
                              onChange={handleChangeCourseName}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Teacher Name"
                              fullWidth
                              defaultValue={obj.teacherName}
                              onChange={handleChangeTeacherName}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Certificate Description"
                              fullWidth
                              defaultValue={obj.certMsg}
                              onChange={handleChangeCertDescription}
                            />
                            <TextField
                              required
                              id="standard-basic"
                              label="Issue Date"
                              fullWidth
                              defaultValue={obj.issueDate}
                              onChange={handleChangeDate}
                            />
                          </DialogContent>
                          <DialogActions
                            className={
                              classes.modalFooter +
                              " " +
                              classes.modalFooterCenter
                            }
                          >
                            <Button onClick={() => closeAction(obj)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={() => confirmEditAction()}
                              color="success"
                            >
                              Edit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12}>
                      <Grid>
                        <Button
                          // id={buttonID(obj)}
                          color="danger"
                          round
                          onClick={() => deleteCert()}
                          // onClick={() => console.log("click!")}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}
      </div>
    </div>
  );
}
