import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
import PageviewIcon from "@material-ui/icons/Pageview";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <InfoArea
            title="Enter the ID of certificate / URL"
            // description="We've created the marketing campaign of the website. It was a very interesting collaboration."
            icon={PageviewIcon}
            iconColor="rose"
          />
        </GridItem>
        <GridItem>
          <CustomInput
            id="certID"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridContainer xs={6}>
          <GridItem>
            <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === "a"}
                    onChange={() => setSelectedEnabled("a")}
                    value="a"
                    name="radio button enabled"
                    aria-label="A"
                    icon={
                      <FiberManualRecord className={classes.radioUnchecked} />
                    }
                    checkedIcon={
                      <FiberManualRecord className={classes.radioChecked} />
                    }
                    classes={{
                      checked: classes.radio
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="ID of certificate"
              />
            </div>
          </GridItem>
          <GridItem>
            <div className={wrapperDiv}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === "b"}
                    onChange={() => setSelectedEnabled("b")}
                    value="b"
                    name="radio button enabled"
                    aria-label="B"
                    icon={
                      <FiberManualRecord className={classes.radioUnchecked} />
                    }
                    checkedIcon={
                      <FiberManualRecord className={classes.radioChecked} />
                    }
                    classes={{
                      checked: classes.radio
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="URL"
              />
            </div>
          </GridItem>
        </GridContainer>
        <GridItem>
          <Button type="button" color="rose">
            Submit
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
