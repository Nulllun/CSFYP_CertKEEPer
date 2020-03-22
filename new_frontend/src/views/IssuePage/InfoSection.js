import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
import Datetime from "react-datetime";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";
// import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

// import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

export default function ProductSection() {
  const classes = useStyles();
  const [courseID, setCourseID] = React.useState("");
  const [recipientID, setRecipientID] = React.useState("");
  const [certType, setCertType] = React.useState("");

  const handleChangeCID = event => {
    setCourseID(event.target.value);
  };

  const handleChangeRID = event => {
    setRecipientID(event.target.value);
  };

  const handleChangeCertType = event => {
    setCertType(event.target.value);
  };

  const [modal, setModal] = React.useState(false);

  return (
    <div className={classes.section}>
      <GridContainer justify="flex-start">
        <GridItem xs={12} sm={12} md={8}>
          <InfoArea
            title="Enter the certificate infomation"
            icon={CreateIcon}
            iconColor="info"
          />
        </GridItem>
      </GridContainer>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>course ID</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={courseID}
                      onChange={handleChangeCID}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={2100}>CSCI2100</MenuItem>
                      <MenuItem value={3310}>CSCI3310</MenuItem>
                      <MenuItem value={1110}>PHYS1110</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider variant="middle" />
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <div>
        <Typography>-</Typography>
      </div>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>recipient ID</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={recipientID}
                      onChange={handleChangeRID}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>1155090001</MenuItem>
                      <MenuItem value={2}>1155090002</MenuItem>
                      <MenuItem value={3}>1155090003</MenuItem>
                      <MenuItem value={4}>1155090004</MenuItem>
                      <MenuItem value={5}>1155090005</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <div>
        <Typography>-</Typography>
      </div>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>certificate type</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={certType}
                      onChange={handleChangeCertType}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Distinction</MenuItem>
                      <MenuItem value={2}>Merit</MenuItem>
                      <MenuItem value={3}>Pass</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <div>
        <Typography>-</Typography>
      </div>

      <GridItem>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>issue date and time</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container>
                <FormControl fullWidth>
                  <Datetime inputProps={{ placeholder: "None" }} />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </GridItem>

      <div>
        <Typography>-</Typography>
      </div>

      {/* modal for confirm action */}
      <GridItem>
        <div>
          <div>
            <Button color="info" round onClick={() => setModal(true)}>
              Issue!
            </Button>
          </div>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={modal}
            // TransitionComponent={Transition}
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
              {/* <h4 className={classes.modalTitle}>Confirmation of Issue</h4> */}
            </DialogTitle>
            <DialogContent
              id="modal-slide-description"
              className={classes.modalBody}
            >
              <h5>Are you sure you want to do this?</h5>
              <h4>Please double confirm the information</h4>
            </DialogContent>
            <DialogActions
              className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
              <Button onClick={() => setModal(false)}>Go Back</Button>
              <Button onClick={() => setModal(false)} color="success">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </GridItem>
    </div>
  );
}
