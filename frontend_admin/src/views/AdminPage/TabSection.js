import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ViewAllCert from "./ViewAllCert.js";
import ViewAllCourse from "./ViewAllCourse.js";
import PDFtemplate from "./PDFtemplate.js";

// @material-ui/icons

// core components

// material-ui core components
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function TabSection() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.section}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All certificates" {...a11yProps(0)} />
        <Tab label="All courses" {...a11yProps(1)} />
        <Tab label="Cert template" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ViewAllCert />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ViewAllCourse />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PDFtemplate />
      </TabPanel>
    </div>
  );
}
