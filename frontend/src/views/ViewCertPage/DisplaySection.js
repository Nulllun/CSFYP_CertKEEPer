import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
// import jsonData from "../../json/cert.json";
import keepLogo from "../../assets/img/keep_logo.png";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var course_name,
  course_code,
  institute,
  certID,
  teacher_name,
  message,
  date,
  targetButton,
  pdfname;

export default function DisplaySection() {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [dlButtonVisibility, setDlButtonVisibility] = React.useState(true);
  const [certList, setCertList] = React.useState([]);
  const [recipientID, setRecipientID] = React.useState(null);

  const handleChangeRecipientID = event => {
    setRecipientID(event.target.value);
  };

  async function getCert() {
    let RID = recipientID;
    if (RID !== undefined && RID !== null) {
      let path = "http://localhost:5000/view";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipientID: JSON.parse(RID)
        })
      });
      let certList = await response.json();
      console.log(certList);
      if (response.status === 200) {
        setCertList(certList);
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

  return (
    <div className={classes.section}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomInput
              id="recipientid"
              labelText="Enter student ID"
              inputProps={{
                fullWidth: true,
                onChange: handleChangeRecipientID
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button color="info" round onClick={() => getCert()}>
              Query
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {certList.map(obj => (
        <div key={obj.certID}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {obj.courseID} - {obj.certMsg} - issued on: {obj.issueDate}
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
                  // onClick={() => setCertValue(obj)}
                  // onClick={() => genPDF()}
                >
                  Not Ready
                </Button>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Typography>-</Typography>
        </div>
      ))}
      {/* {getJsonObject()}
      {jsonobject_string.map(obj => (
        <div key={obj.id}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {obj.course_code} - {obj.description}
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
                      <ListItemText primary="Issue Date" secondary={obj.date} />
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid>
                <Button
                  // id={buttonID(obj)}
                  color="warning"
                  round
                  onClick={() => setCertValue(obj)}
                  // onClick={() => console.log("click!")}
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
                  // onClick={() => setCertValue(obj)}
                  // onClick={() => genPDF()}
                >
                  Not Ready
                </Button>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Typography>-</Typography>
        </div>
      ))} */}
    </div>
  );
}
