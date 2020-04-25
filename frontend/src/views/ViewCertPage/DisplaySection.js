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
import SentimentVeryDissatisfiedRoundedIcon from "@material-ui/icons/SentimentVeryDissatisfiedRounded";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

// core components
import Button from "components/CustomButtons/Button.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  // const [recipientID, setRecipientID] = React.useState(null);
  const [boxStateEmpty, setBoxStateEmpty] = React.useState("none");

  // const handleChangeRecipientID = event => {
  //   setRecipientID(event.target.value);
  // };

  async function getCert() {
    setBoxStateEmpty("none");
    let RID = 1155094246;
    if (RID !== undefined && RID !== null) {
      let path = "http://localhost:5000/view";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searchBy: JSON.parse(2),
          recipientID: JSON.parse(RID)
        })
      });
      let certList = await response.json();
      console.log(certList);
      if (response.status === 200) {
        setCertList(certList);
        setBoxStateEmpty("none");
      }
      if (certList.length == 0) {
        setBoxStateEmpty("block");
      }
    }
  }

  async function setDiscloseCert(obj) {
    var discloseOption_updated;
    console.log("old: " + typeof obj.disclosed);
    console.log("old: " + obj.disclosed);
    if (obj.disclosed == "true") {
      discloseOption_updated = "false";
    } else if (obj.disclosed == "false") {
      discloseOption_updated = "true";
    }
    console.log("new: " + typeof discloseOption_updated);
    console.log("new: " + discloseOption_updated);
    let RID = 1155090001;
    if (RID !== undefined && RID !== null) {
      let path = "http://localhost:5000/disclose";
      let response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          certID: obj.certID,
          discloseOption: discloseOption_updated
        })
      });
      if (response.status === 200) {
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
        <Text style={PDFstyle.title}>Daisy Mang</Text>
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
    certID = obj.certID;
    course_name = obj.content.courseTitle;
    course_code = obj.content.courseID;
    institute = obj.content.institution;
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

  function toggleButtonID(obj) {
    return "toggleButton" + obj.certID;
  }

  // const handleChangeToggle = event => {
  //   console.log("toggled");
  //   setCheckedA(event.target.checked);
  //   setDiscloseCert(obj);
  // }

  function discloseBoolean(obj) {
    if (obj.disclosed == "true") {
      return true;
    } else if (obj.disclosed == "false") {
      return false;
    }
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
                  <FormControlLabel
                    control={
                      <Switch
                        id={toggleButtonID(obj)}
                        checked={discloseBoolean(obj)}
                        onChange={() => setDiscloseCert(obj)}
                        value="disclose"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          thumb: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          track: classes.switchBar
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Disclose to others"
                  />
                </Grid>
              </Grid>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    } else if (obj.content.type == "competition") {
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
                  <FormControlLabel
                    control={
                      <Switch
                        id={toggleButtonID(obj)}
                        checked={discloseBoolean(obj)}
                        onChange={() => setDiscloseCert(obj)}
                        value="disclose"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          thumb: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          track: classes.switchBar
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Disclose to others"
                  />
                </Grid>
              </Grid>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
  }

  return (
    <div className={classes.section}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoArea
              title="My SID is 1155094246"
              description=""
              icon={FaceTwoToneIcon}
              iconColor="info"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button color="info" round onClick={() => getCert()}>
              Query My Cert
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {certList.map(obj => (
        <div key={obj.certID}>{certType(obj)}</div>
      ))}
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
