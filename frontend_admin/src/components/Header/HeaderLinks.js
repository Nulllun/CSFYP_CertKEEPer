/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DescriptionIcon from '@material-ui/icons/Description';
import BackspaceIcon from '@material-ui/icons/Backspace';
import SettingsIcon from '@material-ui/icons/Settings';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Action with Cretificates"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/verify-page" className={classes.dropdownLink}> {/* link to verify page*/}
              Verify
            </Link>,
            <a
              href="/issue-page" //link to issue page
              className={classes.dropdownLink}
            >
              Issue
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/admin-panel" //link to admin panel
          color="transparent"
          className={classes.navLink}
        >
          <SettingsIcon /> Admin panel
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="profile"
          title="Profile"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="/profile-page" //account profile page
            className={classes.navLink}
          >
            <AccountBoxIcon />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="backtokeep"
          title="Back To KEEP"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://course.keep.edu.hk/" //to keep course
            className={classes.navLink}
          >
            <BackspaceIcon />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
