import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import courseJsonData from "../../json/course.json";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// core components

// material-ui core components
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var courseList = [];

export default function ViewAllCourse() {
  const classes = useStyles();
  const [dense] = React.useState(false);

  function readJSON() {
    for (var i = 0; i < courseJsonData.length; i++) {
      courseList[i] = courseJsonData[i];
    }
  }

  function studentList(obj) {
    var string = "";
    var i;
    for (i = 0; i < obj.student.length - 1; i++) {
      string = string + obj.student[i] + ", ";
    }
    string = string + obj.student[i];
    return string;
  }

  return (
    <div>
      {readJSON()}
      <Paper>
        {courseList.map(obj => (
          <div key={obj.id}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {obj.course_code} ({obj.institution})
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {/* <Grid item xs={12} md={6}> */}
                <div className={classes.demo}>
                  <List dense={dense}>
                    <ListItem>
                      <ListItemText
                        primary="Course ID"
                        secondary={obj.course_code}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Course Name"
                        secondary={obj.course_name}
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
                        primary="Teacher Name"
                        secondary={obj.teacher_name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Student List"
                        secondary={studentList(obj)}
                      />
                    </ListItem>
                  </List>
                </div>
                {/* </Grid> */}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}
      </Paper>
    </div>
  );
}
