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
  BlobProvider,
  PDFDownloadLink
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import jsonData from "../../json/cert.json";
// import CertData from "./certData";
import keepLogo from "../../assets/img/keep_logo.png";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// core components
import Button from "components/CustomButtons/Button.js";

// import component from "@material-ui/core
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var course_name,
  course_code,
  institute,
  certID,
  targetButton = "button2";

export default function DisplaySection() {
  const classes = useStyles();
  const [dense] = React.useState(false);
  // const [courseCode, setCourseCode] = React.useState("");
  // const [courseName, setCourseName] = React.useState("");
  // const [institution, setInstitution] = React.useState("");
  const [dlButtonVisibility, setDlButtonVisibility] = React.useState(true);
  const [buttonText, setButtonText] = React.useState("Generate PDF");
  // const [targetButton, setTargetButton] = React.useState("button3");

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
      </Page>
    </Document>
  );

  // const App = () => (
  //   <PDFViewer>
  //     <MyDocument />
  //   </PDFViewer>
  // );

  // const App = () => (
  //   <BlobProvider document={MyDocument}>
  //     {({ url }) => (
  //       <a href={url} target={"_blank"}>
  //         Open in new tab
  //       </a>
  //     )}
  //   </BlobProvider>
  // );

  const App = () => (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="test.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );

  function loadingPDF() {
    setButtonText("Loading document");
  }

  function PDFready() {
    setButtonText("Download now!");
  }

  function genPDF() {
    console.log("generating PDF");
    // <BlobProvider document={<App />}>
    //   {({ url }) => (
    //     <a href={url} target="_blank">
    //       Open in new tab
    //     </a>
    //   )}
    // </BlobProvider>;
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

  // const getid = event => {
  //   console.log(event.target.id);
  // };

  // function getid(){
  //   console.log("ID: " + event.target.id);
  // }

  const setCertValue = obj => {
    // setCourseCode("DLLM0000");
    // setCourseName(obj.course_name);
    // setInstitution(obj.institution);

    course_name = obj.course_name;
    course_code = obj.course_code;
    institute = obj.institution;
    certID = obj.certid;
    targetButton = "button" + obj.id;

    console.log(targetButton);

    genPDF();

    setDlButtonVisibility(false);
  };

  function buttonID(obj) {
    return "button" + obj.id;
  }

  return (
    <div className={classes.section}>
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
                  {/* Generate PDF */}
                  {buttonText}
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
                  Download PDF
                </Button>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Typography>-</Typography>
        </div>
      ))}
    </div>
  );
}
