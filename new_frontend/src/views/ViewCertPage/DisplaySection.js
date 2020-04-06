import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import jsonData from "../../json/cert.json";

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
  const MyDocument = () => (
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

  const App = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );

  function genPDF() {
    console.log("will gen PDF");
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  var jsonobject_string = [];
  function getJsonObject() {
    for (var i = 0; i < jsonData.length; i++) {
      var obj = jsonData[i];
      jsonobject_string[i] = obj;
    }
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
                <Button color="warning" round onClick={() => genPDF(obj)}>
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
