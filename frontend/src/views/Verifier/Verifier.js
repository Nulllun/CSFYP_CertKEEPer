import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

export default function Verifier() {
  const classes = useStyles();
  return (
    <div>
      <h1>Verifier A Certificate</h1>
      <p>Input the certID of the certificate</p>
      <div>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Cert ID"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" className={classes.button}>
          Verify!
        </Button>
      </div>
    </div>
  );
}
