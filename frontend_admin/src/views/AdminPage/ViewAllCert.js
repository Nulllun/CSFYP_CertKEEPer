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
import SentimentVeryDissatisfiedRoundedIcon from "@material-ui/icons/SentimentVeryDissatisfiedRounded";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Danger from "components/Typography/Danger.js";
import InfoArea from "components/InfoArea/InfoArea.js";

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
  // recipient_id,
  targetButton,
  pdfname;

var deleteCertID;

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
  const [comp_name_edit, setComp_name_edit] = React.useState("");
  const [org_name_edit, setOrg_name_edit] = React.useState("");
  const [award_edit, setAward_edit] = React.useState("");
  const [date_edit, setDate_edit] = React.useState("");
  const [certDescription_edit, setCertDescription_edit] = React.useState("");
  const [issuePlatform_edit, setIssuePlatform_edit] = React.useState("");
  const [activeModal, setActiveModal] = React.useState(null);
  const [certList, setCertList] = React.useState([]);
  const [recipientID, setRecipientID] = React.useState("");
  const [searchField, setSearchField] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState(2);
  const [boxStateInvalidInput, setBoxStateInvalidInput] = React.useState(
    "none"
  );
  const [boxStateEmpty, setBoxStateEmpty] = React.useState("none");
  const [modalDelete, setModalDelete] = React.useState(false);
  const [activeModalDelete, setActiveModalDelete] = React.useState(null);
  const [openDeletedDialog, setOpenDeletedDialog] = React.useState(false);

  // const handleChangeRecipientID = event => {
  //   setRecipientID(event.target.value);
  // };

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

  const handleChangeOrganisationName = event => {
    setOrg_name_edit(event.target.value);
  };

  const handleChangeComptitionName = event => {
    setComp_name_edit(event.target.value);
  };

  const handleChangeAward = event => {
    setAward_edit(event.target.value);
  };

  async function getCert() {
    setBoxStateInvalidInput("none");
    setBoxStateEmpty("none");
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
          setCertList([certList]);
          setBoxStateEmpty("none");
        }
        if (certList.result == "Fail") {
          setCertList([]);
          setBoxStateEmpty("block");
        }
      } else if (searchBy == 2) {
        console.log("rid");
        for (var i = 0; i < input.length; i++) {
          if (input[i] < "0" || input[i] > "9") {
            console.log("invalid");
            setBoxStateInvalidInput("block");
            return;
          }
        }
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
          setBoxStateEmpty("none");
        }
        if (certList == "") {
          setBoxStateEmpty("block");
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
          setBoxStateEmpty("none");
        }
        if (certList == "") {
          setBoxStateEmpty("block");
        }
      }
    }
  }

  async function issueCert(type) {
    var certID_split = certID_edit.split("-")[1];
    console.log("fuck " + certID_split);
    var cert;
    if (type == "course") {
      cert = {
        type: type,
        issuePlatform: issuePlatform_edit,
        institution: institution_edit,
        courseID: course_code_edit,
        courseTitle: course_name_edit,
        teacherName: teacher_name_edit,
        recipientID: recipientID,
        certMsg: certDescription_edit,
        issueDate: date_edit,
        signerName: "Irwin",
        signerID: "IK1901"
      };
    } else if (type == "competition") {
      cert = {
        type: type,
        issuePlatform: "KEEP",
        competitionName: comp_name_edit,
        organisationName: org_name_edit,
        award: award_edit,
        recipientID: recipientID,
        issueDate: date_edit,
        signerName: "Irwin",
        signerID: "IK1901"
      };
    }
    console.log("Request is sent with " + certID_edit);
    if (cert !== null) {
      let path = "http://localhost:5000/issue";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          certID: certID_split,
          certContent: cert,
          privateKey:
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIzNtjeDq0y9P0\nOVfyX4WOAcKlHWLVwUdNzmYPO6aORpJb1/jlikc7/qQBcviLk6rJbw70HDxk33xj\nd9XCEW3phsgFN0fu3dY4n8FI3pNG/6ghYyS5cG1lHGslzk95k0/f2CLyDU6B9WoL\nY25rusjqEN5KxznYQMbrH4ibI1f9ceYssxdbv02ILt0Ax5Nip0WCa91AUHOtJLBf\nlLm4vLauipyXUVcFQNpm3PD7NFOJU2vZrZuSki08r/d1+W4kptZEMqOnt4HoTkq0\nvEcw5NEHv4a6A+AsLpUfzxdVZotk8vU4+1PIzQaHearJdyCVt14uB9RZRpM2HNTj\nduCX55+zAgMBAAECggEAVRwPeU/CglNKmV+c2UyHjTNNzzJva+6qTF5Jf/dmlzNu\nYaNfCdvcaZ964Gpc0rxaTVrXWbyGFLNtQ7PNVJ6SmcLZEOznfmVkoUeFY1+DyTof\nh1dAf6EZnRu4hqO1p/A6kMRJu5LMTeU5d25DpUHcWumfbs6WxARgy9Pn0OngJ7nZ\nBLXqJrm1lljHApFYuEmuT+uHKQlNnwQULY9PExFAiPCYTDM8Nl1unEDnH9Rgb+EE\npoLR6e/pNUJLQz/KhIMSOxmnnuc3pzCAwSf+xvdXC+HFAvGrHxCHF/O3Zs/Q31pm\nBQ/u7yfyffqvmTPVKvjq3wk/vCWP/Nrh14nfkXNdsQKBgQDi53RD9vNSAw0eXgOS\nTWoAn+yQS96l6B6nc+ZVzN0PMVueoU5JwEZcFWk+ccFCysmuwE01qQ83Ihfew4VT\nO2WwBFqduTDQrLa7lT9kWy+s9wjtZNop3Xfr9I5QR0vI6QFXbfFuMcjECz11YyUL\n05NFkAb6Wc4PNx97gOXujhK2FwKBgQDijH6OHvW1ls36Uv1Cl9f/u2xXu3eot/oB\nm0SMfIYY+N6LRUqn4SekeZnbaXmNC91b7kTy+4oe6259sH1zxLCCAGcHfklwKiK4\nVvqvH+ULjt8tezfsKJmEwvoBVO1KjkWUSYlx/mSNCvXp1ILwxZ+znG99qPCPn2mX\nz1EWWvqAxQKBgQCITC4b0VCR2AFeV2zfyh69p1MLznc8w3T+c3FN4tR7FtQJMq37\nQUNCdx4UA3LqszN5BEycyiO4o4MhLeN9frVziPoBukdnYggWH+3HU7sMtAupxiYC\ndeVeWDXQZTNRyR0kLoeTANavZG0TgW20b/AMHhsC8UUFAMCpiGEV7kOxGwKBgGkQ\nEMzmLLsXAdU6UXtloeVWTQtuxDJ5h7bhA+xG/4VrPQHHk7TBZToQrrqjcpxnyTOO\nD2nEH6zxMB+YDsX2jIjtmNpPxcz/rXRh2gYHO5idnICiKTAbL/7y0TB260jtK/V2\nGQjFmmoSkDLtu//fFo4cWVQkWdOxcS3XFlrQvGWlAoGBAKnFKXYouGUPKw6Kn99s\nly14pJxhlpYGnm3NeZz8VJkxpOdvfPrSfL6W+0ZpnPbnwEBKymZ8R8VDXDIZGo9E\nzE523izoMJ/VRea0CNC7LT4OAJbYP/5dHz0i35rmzpyZM1r7AmVmikgwVqWKzvWN\nc8bsyRkQ7bxPHh0xoN7kVc54\n-----END PRIVATE KEY-----\n"
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

  async function deleteCert() {
    let path = "http://localhost:5000/delete";
    let response = await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        certID: deleteCertID
      })
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      console.log("Certificates deleted");
      setOpenDeletedDialog(true);
      getCert();
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
    course_name = obj.content.courseTitle;
    course_code = obj.content.courseID;
    institute = obj.content.institution;
    certID = obj.content.certID;
    teacher_name = obj.content.teacherName;
    message = obj.content.certMsg;
    date = obj.content.issueDate;
    targetButton = "button" + obj.certID;
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
    if (obj.content.type == "course") {
      presetEditCertValue(obj);
    } else if (obj.content.type == "competition") {
      presetEditCertValueComp(obj);
    }
  };

  function closeAction(obj) {
    console.log("close modal");
    presetEditCertValue(obj);
    setModal(false);
    setActiveModal(null);
  }

  function confirmEditAction(obj) {
    console.log("confirm edit certificate");
    setModal(false);
    setActiveModal(null);
    issueCert(obj.content.type);
  }

  function deleteCertClicked(obj) {
    setActiveModalDelete(obj.certID);
    console.log("delete certificate");
    deleteCertID = obj.certID;
    setTimeout(function() {
      setModalDelete(true);
    }, 1000);
    console.log(deleteCertID);
  }

  function closeActionDelete() {
    console.log("close modal");
    setModalDelete(false);
    setActiveModalDelete(null);
  }

  function confirmDelete() {
    deleteCert();
    setModalDelete(false);
    setActiveModalDelete(null);
  }

  function presetEditCertValue(obj) {
    console.log("setting...");
    setCertID_edit(obj.certID);
    setInstitution_edit(obj.content.institution);
    setCourse_code_edit(obj.content.courseID);
    setCourse_name_edit(obj.content.courseTitle);
    setTeacher_name_edit(obj.content.teacherName);
    setCertDescription_edit(obj.content.certMsg);
    setDate_edit(obj.content.issueDate);
    setIssuePlatform_edit(obj.content.issuePlatform);
    setRecipientID(obj.content.recipientID);
  }

  function presetEditCertValueComp(obj) {
    console.log("setting...");
    setCertID_edit(obj.certID);
    setOrg_name_edit(obj.content.organisationName);
    setComp_name_edit(obj.content.competitionName);
    setAward_edit(obj.content.award);
    setDate_edit(obj.content.issueDate);
    setIssuePlatform_edit(obj.content.issuePlatform);
    setRecipientID(obj.content.recipientID);
  }

  function handleCloseDeletedDialog() {
    setOpenDeletedDialog(false);
  }

  function certType(obj) {
    if (obj.content.type == "course") {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {obj.certID} - issued on: {obj.content.issueDate}
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
                      secondary={obj.content.institution}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Issue Platform"
                      secondary={obj.content.issuePlatform}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Student ID"
                      secondary={obj.content.recipientID}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Course ID"
                      secondary={obj.content.courseID}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Course Title"
                      secondary={obj.content.courseTitle}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Teacher Name"
                      secondary={obj.content.teacherName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Certificate Description"
                      secondary={obj.content.certMsg}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Issue Date"
                      secondary={obj.content.issueDate}
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
                          defaultValue={obj.content.institution}
                          onChange={handleChangeInstitution}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Issue Platform"
                          fullWidth
                          defaultValue={obj.content.issuePlatform}
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
                          defaultValue={obj.content.recipientID}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Course Code"
                          fullWidth
                          defaultValue={obj.content.courseID}
                          onChange={handleChangeCourseCode}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Course Name"
                          fullWidth
                          defaultValue={obj.content.courseTitle}
                          onChange={handleChangeCourseName}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Teacher Name"
                          fullWidth
                          defaultValue={obj.content.teacherName}
                          onChange={handleChangeTeacherName}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Certificate Description"
                          fullWidth
                          defaultValue={obj.content.certMsg}
                          onChange={handleChangeCertDescription}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Issue Date"
                          fullWidth
                          defaultValue={obj.content.issueDate}
                          onChange={handleChangeDate}
                        />
                      </DialogContent>
                      <DialogActions
                        className={
                          classes.modalFooter + " " + classes.modalFooterCenter
                        }
                      >
                        <Button onClick={() => closeAction(obj)}>Cancel</Button>
                        <Button
                          onClick={() => confirmEditAction(obj)}
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
                      color="danger"
                      round
                      onClick={() => deleteCertClicked(obj)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={activeModalDelete == obj.certID}
                  keepMounted
                  onClose={() => setModalDelete(false)}
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
                      onClick={() => closeActionDelete()}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    <h5>Are you sure you want to delete {obj.certID}?</h5>
                    <h4 color="danger">This cannot be undone.</h4>
                  </DialogContent>
                  <DialogActions
                    className={
                      classes.modalFooter + " " + classes.modalFooterCenter
                    }
                  >
                    <Button onClick={() => closeActionDelete()}>Go Back</Button>
                    <Button onClick={() => confirmDelete(obj)} color="success">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  onClose={handleCloseDeletedDialog}
                  aria-labelledby="customized-dialog-title"
                  open={openDeletedDialog}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDeletedDialog}
                  >
                    Notification
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>Deleted.</Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    if (obj.content.type == "competition") {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {obj.certID} - issued on: {obj.content.issueDate}
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
                      primary="Organization"
                      secondary={obj.content.organisationName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Issue Platform"
                      secondary={obj.content.issuePlatform}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Recipient ID"
                      secondary={obj.content.recipientID}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Competition Name"
                      secondary={obj.content.competitionName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Award"
                      secondary={obj.content.award}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Issue Date"
                      secondary={obj.content.issueDate}
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
                          label="Organization"
                          fullWidth
                          defaultValue={obj.content.organisationName}
                          onChange={handleChangeOrganisationName}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Issue Platform"
                          fullWidth
                          defaultValue={obj.content.issuePlatform}
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
                          defaultValue={obj.content.recipientID}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Competition Name"
                          fullWidth
                          defaultValue={obj.content.competitionName}
                          onChange={handleChangeComptitionName}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Award"
                          fullWidth
                          defaultValue={obj.content.award}
                          onChange={handleChangeAward}
                        />
                        <TextField
                          required
                          id="standard-basic"
                          label="Issue Date"
                          fullWidth
                          defaultValue={obj.content.issueDate}
                          onChange={handleChangeDate}
                        />
                      </DialogContent>
                      <DialogActions
                        className={
                          classes.modalFooter + " " + classes.modalFooterCenter
                        }
                      >
                        <Button onClick={() => closeAction(obj)}>Cancel</Button>
                        <Button
                          onClick={() => confirmEditAction(obj)}
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
                      color="danger"
                      round
                      onClick={() => deleteCertClicked(obj)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={activeModalDelete == obj.certID}
                  keepMounted
                  onClose={() => setModalDelete(false)}
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
                      onClick={() => closeActionDelete()}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    <h5>Are you sure you want to delete {obj.certID}?</h5>
                    <h4 color="danger">This cannot be undone.</h4>
                  </DialogContent>
                  <DialogActions
                    className={
                      classes.modalFooter + " " + classes.modalFooterCenter
                    }
                  >
                    <Button onClick={() => closeActionDelete()}>Go Back</Button>
                    <Button onClick={() => confirmDelete(obj)} color="success">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  onClose={handleCloseDeletedDialog}
                  aria-labelledby="customized-dialog-title"
                  open={openDeletedDialog}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDeletedDialog}
                  >
                    Notification
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>Deleted.</Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
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
              <Grid item xs={12} spacing={3}>
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
              <Box display={boxStateInvalidInput}>
                <Grid item xs={12} spacing={3}>
                  <Danger>Invalid input.</Danger>
                </Grid>
              </Box>
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
          <div key={obj.certID}>{certType(obj)}</div>
        ))}
      </div>
      <Box display={boxStateEmpty}>
        <InfoArea
          title="No result(s) found..."
          description=""
          icon={SentimentVeryDissatisfiedRoundedIcon}
          iconColor="info"
        />
      </Box>
    </div>
  );
}
