import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// import EditIcon from "@material-ui/icons/Edit";

// core components
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";

//material-ui components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function InfoSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Name</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">Daisy Mang</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Student ID</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">1155094246</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Occupation</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">Student</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Institute</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">
                  The Chinese Univeristy of Hong Kong
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Major</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">Computer Science</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography align="center">Year</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">4</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>
      <Typography>
        <br />
      </Typography>
      {/* <GridItem>
        <Button type="button" color="info">
          Edit Profile
          <EditIcon />
        </Button>
      </GridItem> */}
    </div>
  );
}
