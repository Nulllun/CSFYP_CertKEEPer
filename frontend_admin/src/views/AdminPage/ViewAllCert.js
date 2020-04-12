import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Font,
  PDFDownloadLink
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import jsonData from "../../json/cert.json";
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

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var course_name,
  course_code,
  institute,
  certID,
  teacher_name,
  date,
  targetButton,
  pdfname;

export default function ViewAllCert() {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [dlButtonVisibility, setDlButtonVisibility] = React.useState(true);
  // const [buttonText, setButtonText] = React.useState("Generate PDF");
  const [modal, setModal] = React.useState(false);
  const [course_name_edit, setCourse_name_edit] = React.useState("");

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
          successfuly completed and received a passing grade in
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

  var jsonobject_string = [];
  function getJsonObject() {
    for (var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      jsonobject_string[i] = obj;
    }
  }

  const setCertValue = obj => {
    course_name = obj.course_name;
    course_code = obj.course_code;
    institute = obj.institution;
    certID = obj.certid;
    teacher_name = obj.teacher_name;
    date = obj.date;
    targetButton = "button" + obj.id;

    // console.log(targetButton);

    genPDF();
    setDlButtonVisibility(false);
  };

  function buttonID(obj) {
    return "button" + obj.id;
  }

  React.useEffect(() => {
    console.log("Do something after counter has changed", course_name_edit);
  }, [course_name_edit]);

  const editCert = obj => {
    setCertValue(obj);
    setCourse_name_edit("TEST4000");
    console.log("course name state is " + course_name_edit);
    setTimeout(function() {
      setModal(true);
    }, 100);
  };

  const handleChangeCourseName = event => {
    console.log("course name ahhhhhhh!!!!!");
    setCourse_name_edit(event.target.value);
  };

  return (
    <div className={classes.section}>
      <div>
        <Paper>
          <h4>Search bar</h4>
        </Paper>
      </div>
      <div>
        {getJsonObject()}
        {jsonobject_string.map(obj => (
          <div key={obj.id}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {obj.certid} - issued on: {obj.date}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12} md={6}>
                  <div className={classes.demo}>
                    <List dense={dense}>
                      <ListItem>
                        <ListItemText
                          primary="Certficate ID"
                          secondary={obj.certid}
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
                          primary="Course ID"
                          secondary={obj.course_code}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Title"
                          secondary={obj.course_name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Teacher Name"
                          secondary={obj.teacher_name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Certificate Description"
                          secondary={obj.description}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Issue Date"
                          secondary={obj.date}
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
                          // onClick={() => console.log("click!")}
                        >
                          Generate PDF
                          {/* {buttonText} */}
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          id={buttonID(obj)}
                          color="warning"
                          disabled={dlButtonVisibility}
                          round
                          // onClick={() => setCertValue(obj)}
                          // onClick={() => genPDF()}
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
                          // onClick={() => console.log("click!")}
                        >
                          Edit
                        </Button>
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
                              id="standard-basic"
                              label="Course Name"
                              defaultValue={course_name_edit}
                              onChange={handleChangeCourseName}
                            />
                          </DialogContent>
                          <DialogActions
                            className={
                              classes.modalFooter +
                              " " +
                              classes.modalFooterCenter
                            }
                          >
                            <Button onClick={() => setModal(false)}>
                              Never Mind
                            </Button>
                            <Button
                              onClick={() => setModal(false)}
                              color="success"
                            >
                              Yes
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
                          onClick={() => setCertValue(obj)}
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
