import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import ReactPDF from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import jsonData from "../../json/cert.json";
// import CertData from "./certData";

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

export default function DisplaySection() {
  const classes = useStyles();
  const [dense] = React.useState(false);

  const PDFstyle = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  // Create Document Component
  const MyDocument1 = () => (
    <Document>
      <Page size="A4" style={PDFstyle.page}>
        <View style={PDFstyle.section}>
          <Text>certKEEPer</Text>
          <Text>Certificate ID: CERT-2100-01</Text>
          <Text>Institution: The Chinese University of Hong Kong</Text>
          <Text>Course Code: CSCI2100</Text>
          <Text>Course Name: Data Structure</Text>
          <Text>Teacher Name: Prof. King</Text>
          <Text>Certificate Description: Best Programmer</Text>
          <Text>Issue Date: 06-04-2020</Text>
        </View>
        {/* <View style={PDFstyle.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );

  const App1 = () => (
    <PDFViewer>
      <MyDocument1 />
    </PDFViewer>
  );

  function genPDF1() {
    console.log("will gen PDF");
    const rootElement = document.getElementById("root");
    ReactDOM.render(<App1 />, rootElement);
  }

  // Create Document Component
  const MyDocument2 = () => (
    <Document>
      <Page size="A4" style={PDFstyle.page}>
        <View style={PDFstyle.section}>
          <Text>certKEEPer</Text>
          <Text>Certificate ID: CERT-1000-01</Text>
          <Text>Institution: The Chinese University of Hong Kong</Text>
          <Text>Course Code: UGFN1000</Text>
          <Text>Course Name: In Dialogue With Nature</Text>
          <Text>Teacher Name: Dr. Kiang Kai Ming</Text>
          <Text>Certificate Description: Pass</Text>
          <Text>Issue Date: 06-04-2020</Text>
        </View>
        {/* <View style={PDFstyle.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );

  const App2 = () => (
    <PDFViewer>
      <MyDocument2 />
    </PDFViewer>
  );

  function genPDF2() {
    console.log("will gen PDF");
    const rootElement = document.getElementById("root");
    ReactDOM.render(<App2 />, rootElement);
  }

  // Create Document Component
  const MyDocument3 = () => (
    <Document>
      <Page size="A4" style={PDFstyle.page}>
        <View style={PDFstyle.section}>
          <Text>certKEEPer</Text>
          <Text>Certificate ID: CERT-3310-01</Text>
          <Text>Institution: The Chinese University of Hong Kong</Text>
          <Text>Course Code: CSCI3100</Text>
          <Text>
            Course Name: Mobile Computing and Applications Development
          </Text>
          <Text>Teacher Name: Prof. Michael Lyu</Text>
          <Text>Certificate Description: B grade</Text>
          <Text>Issue Date: 06-04-2020</Text>
        </View>
        {/* <View style={PDFstyle.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );

  const App3 = () => (
    <PDFViewer>
      <MyDocument3 />
    </PDFViewer>
  );

  function genPDF3() {
    console.log("will gen PDF");
    const rootElement = document.getElementById("root");
    ReactDOM.render(<App3 />, rootElement);
  }

  // Create Document Component
  const MyDocument4 = () => (
    <Document>
      <Page size="A4" style={PDFstyle.page}>
        <View style={PDFstyle.section}>
          <Text>certKEEPer</Text>
          <Text>Certificate ID: CERT-2460-01</Text>
          <Text>Institution: The Chinese University of Hong Kong</Text>
          <Text>Course Code: JASP2460</Text>
          <Text>Course Name: New Practical Japanese IV</Text>
          <Text>Teacher Name: Ms. Winkki Choi</Text>
          <Text>Certificate Description: A grade</Text>
          <Text>Issue Date: 06-04-2020</Text>
        </View>
        {/* <View style={PDFstyle.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );

  const App4 = () => (
    <PDFViewer>
      <MyDocument4 />
    </PDFViewer>
  );

  function genPDF4() {
    console.log("will gen PDF");
    const rootElement = document.getElementById("root");
    ReactDOM.render(<App4 />, rootElement);
  }

  var jsonobject_string = [];
  function getJsonObject() {
    for (var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      jsonobject_string[i] = obj;
    }
  }

  function determineWhichPDF(obj) {
    if (obj.course_code == "CSCI2100") genPDF1();
    else if (obj.course_code == "UGFN1000") genPDF2();
    else if (obj.course_code == "CSCI3100") genPDF3();
    else if (obj.course_code == "JASP2460") genPDF4();
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
                {/* CSCI2100 - Best Programmer */}
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
                  color="warning"
                  round
                  onClick={() => determineWhichPDF(obj)}
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
