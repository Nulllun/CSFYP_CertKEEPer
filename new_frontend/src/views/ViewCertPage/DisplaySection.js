import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

// import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function DisplaySection() {
  const classes = useStyles();
  const [dense] = React.useState(false);

  return (
    <div className={classes.section}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            CSCI2100 - Best Programmer
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary="Certficate ID"
                    secondary="CERT-2100-01"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Institution"
                    secondary="The Chinese University of Hong Kong"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Course ID" secondary="CSCI 2100" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Title" secondary="Data Structure" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teacher Name"
                    secondary="Prof. Irwin King"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Certificate Description"
                    secondary="Best Programmer"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Issue Date" secondary="22-12-2019" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid>
            <Button color="warning" round>
              Download PDF
            </Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Typography>-</Typography>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            CSCI2100 - Distinction
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary="Certficate ID"
                    secondary="CERT-2100-02"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Institution"
                    secondary="The Chinese University of Hong Kong"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Course ID" secondary="CSCI 2100" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Title" secondary="Data Structure" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teacher Name"
                    secondary="Prof. Irwin King"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Certificate Description"
                    secondary="Distinction (Grade A)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Issue Date" secondary="22-12-2019" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid>
            <Button color="warning" round>
              Download PDF
            </Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Typography>-</Typography>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>PHYS1000 - Pass</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary="Certficate ID"
                    secondary="CERT-1000-01"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Institution"
                    secondary="The Chinese University of Hong Kong"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Course ID" secondary="PHYS 1000" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Title" secondary="Physics I" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teacher Name"
                    secondary="Prof. Alvin Leung"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Certificate Description"
                    secondary="Pass (Grade D)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Issue Date" secondary="23-12-2019" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid>
            <Button color="warning" round>
              Download PDF
            </Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
