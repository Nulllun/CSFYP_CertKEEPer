import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

//material-ui components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

var name_current, occupation_current, institute_current, department_current;

export default function InfoSection() {
  const classes = useStyles();
  const [name, setName] = React.useState("Admin");
  const [occupation, setOccupation] = React.useState("Admin");
  const [institute, setInstitute] = React.useState(
    "The Chinese Univeristy of Hong Kong"
  );
  const [department, setDepartment] = React.useState("Computer Science");
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeOccupation = event => {
    setOccupation(event.target.value);
  };

  const handleChangeInstitute = event => {
    setInstitute(event.target.value);
  };

  const handleChangeDepartment = event => {
    setDepartment(event.target.value);
  };

  const editProfile = () => {
    name_current = name;
    occupation_current = occupation;
    institute_current = institute;
    department_current = department;
    setOpen(true);
    setModal(true);
  };

  function closeAction() {
    setName(name_current);
    setOccupation(occupation_current);
    setInstitute(institute_current);
    setDepartment(department_current);
    setModal(false);
    setOpen(false);
  }

  function confirmEditAction() {
    setModal(false);
    setOpen(false);
  }

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
                <Typography align="center">{name}</Typography>
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
                <Typography align="center">{occupation}</Typography>
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
                <Typography align="center">{institute}</Typography>
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
                <Typography align="center">Department</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Typography align="center">{department}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <Typography>
        <br />
      </Typography>

      <GridItem>
        <Button type="button" color="info" onClick={() => editProfile()}>
          Edit Profile
          <EditIcon />
        </Button>
      </GridItem>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        fullWidth={true}
        open={open}
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
            onClick={() => closeAction()}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Edit profile</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <TextField
            required
            id="standard-basic"
            label="Name"
            fullWidth
            defaultValue={name}
            onChange={handleChangeName}
          />
          <TextField
            required
            id="standard-basic"
            label="Occupation"
            fullWidth
            defaultValue={occupation}
            onChange={handleChangeOccupation}
          />
          <TextField
            required
            id="standard-basic"
            label="Institute"
            fullWidth
            defaultValue={institute}
            onChange={handleChangeInstitute}
          />
          <TextField
            required
            id="standard-basic"
            label="Department"
            fullWidth
            defaultValue={department}
            onChange={handleChangeDepartment}
          />
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => closeAction()}>Cancel</Button>
          <Button onClick={() => confirmEditAction()} color="success">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
