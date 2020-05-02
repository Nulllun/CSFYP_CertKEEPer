import React from "react";
import ReactDOM from "react-dom";
import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
import keepLogo from "../../assets/img/keep_logo.png";

// core components
import Button from "components/CustomButtons/Button.js";

// material-ui core components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function PDFtemplate() {
  // const classes = useStyles();
  const [input, setInput] = React.useState(defaultValueCourse());
  const [inputC, setInputC] = React.useState(defaultValueComp());
  const [BoxStateCourse, setBoxStateCourse] = React.useState("none");
  const [BoxStateComp, setBoxStateComp] = React.useState("none");

  const handleChangeInput = event => {
    setInput(event.target.value);
  };

  const handleChangeInputC = event => {
    setInputC(event.target.value);
  };

  // Create styles
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
    },
    ID: {
      fontSize: 8,
      marginBottom: 20,
      textAlign: "left",
      color: "grey"
    },
    titleInline: {
      fontSize: 24
    },
    lineComp: {
      fontSize: 12,
      color: "grey",
      textAlign: "right"
    }
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={PDFstyle.body}>
        <Text style={PDFstyle.ID}>
          {"{"}certID{"}"}
        </Text>
        <Image style={PDFstyle.logo} src={keepLogo} />
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>This is to certify that</Text>
        <Text style={PDFstyle.title}>
          {"{"}student_name{"}"}
        </Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>
          successfuly completed and received {"{"}message{"}"} in
        </Text>
        <Text style={PDFstyle.title}>
          {"{"}course_code{"}"}: {"{"}course_name{"}"}
        </Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}>in</Text>
        <Text style={PDFstyle.header}>
          {"{"}institute{"}"}
        </Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.header}></Text>
        <Text style={PDFstyle.line}>__________________</Text>
        <Text style={PDFstyle.line}> </Text>
        <Text style={PDFstyle.line}>
          {"{"}teacher_name{"}"}
        </Text>
        <Text style={PDFstyle.line}> </Text>
        <Text style={PDFstyle.line}>
          {"{"}date{"}"}
        </Text>
      </Page>
    </Document>
  );

  const App = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );

  function showPDFCourse() {
    setBoxStateCourse("block");
    setBoxStateComp("none");
    ReactDOM.render(<App />, document.getElementById("areaB"));
  }

  function defaultValueCourse() {
    return (
      "const PDFstyle = StyleSheet.create({\n" +
      "  body: {\n" +
      "    paddingTop: 35,\n" +
      "    paddingBottom: 65,\n" +
      "    paddingHorizontal: 35\n" +
      "  },\n" +
      "  title: {\n" +
      "    fontSize: 24,\n" +
      '    textAlign: "center"\n' +
      "  },\n" +
      "  logo: {\n" +
      "    width: 250\n" +
      "  },\n" +
      "  header: {\n" +
      "    fontSize: 12,\n" +
      "    marginBottom: 20,\n" +
      '    textAlign: "center",\n' +
      '    color: "grey"\n' +
      "  },\n" +
      "  line: {\n" +
      "    fontSize: 12,\n" +
      '    color: "grey"\n' +
      "  },\n" +
      "  ID: {\n" +
      "    fontSize: 8,\n" +
      "    marginBottom: 20,\n" +
      '    textAlign: "left",\n' +
      '    color: "grey"\n' +
      "  },\n" +
      "});\n\n" +
      "const MyDocument = () => (\n" +
      "  <Document>\n" +
      '    <Page size="A4" style={PDFstyle.body}>\n' +
      "      <Text style={PDFstyle.ID}>{certID}</Text>\n" +
      "      <Image style={PDFstyle.logo} src={keepLogo} />\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}>This is to certify that</Text>\n" +
      "      <Text style={PDFstyle.title}>{student_name}</Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}>\n" +
      "        successfuly completed and received {message} in\n" +
      "      </Text>\n" +
      "      <Text style={PDFstyle.title}>\n" +
      "        {course_code}: {course_name}\n" +
      "      </Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}>in</Text>\n" +
      "      <Text style={PDFstyle.header}>{institute}</Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.line}>__________________</Text>\n" +
      "      <Text style={PDFstyle.line}> </Text>\n" +
      "      <Text style={PDFstyle.line}>{teacher_name}</Text>\n" +
      "      <Text style={PDFstyle.line}> </Text>\n" +
      "      <Text style={PDFstyle.line}>{date}</Text>\n" +
      "    </Page>\n" +
      "  </Document>\n" +
      ");\n"
    );
  }

  //-----------------------------------------------------------------------------

  const PDFstyleB = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    title: {
      fontSize: 24,
      textAlign: "center"
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
    },
    ID: {
      fontSize: 8,
      marginBottom: 20,
      textAlign: "left",
      color: "grey"
    },
    titleInline: {
      fontSize: 24
    },
    lineComp: {
      fontSize: 12,
      color: "grey",
      textAlign: "right"
    }
  });

  // Create Document Component
  const MyDocumentComp = () => (
    <Document>
      <Page size="A4" style={PDFstyleB.body}>
        <Text style={PDFstyleB.ID}>
          {"{"}certID{"}"}
        </Text>
        <Image style={PDFstyleB.logo} src={keepLogo} />
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.header}>Certificate of Recognition</Text>
        <Text style={PDFstyleB.header}>This award is given to</Text>
        <Text style={PDFstyleB.title}>
          {"{"}student_name{"}"}
        </Text>
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.header}>for winning</Text>
        <Text style={PDFstyleB.title}>
          {"{"}award{"}"} in {"{"}comp_name{"}"}
        </Text>
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.header}>
          organised by {"{"}org_name{"}"}
        </Text>
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.header}></Text>
        <Text style={PDFstyleB.lineComp}>
          {"{"}date{"}"}
        </Text>
      </Page>
    </Document>
  );

  const Comp = () => (
    <PDFViewer>
      <MyDocumentComp />
    </PDFViewer>
  );

  function defaultValueComp() {
    return (
      "const PDFstyle = StyleSheet.create({\n" +
      "  body: {\n" +
      "    paddingTop: 35,\n" +
      "    paddingBottom: 65,\n" +
      "    paddingHorizontal: 35\n" +
      "  },\n" +
      "  title: {\n" +
      "    fontSize: 24,\n" +
      '    textAlign: "center"\n' +
      "  },\n" +
      "  logo: {\n" +
      "    width: 250\n" +
      "  },\n" +
      "  header: {\n" +
      "    fontSize: 12,\n" +
      "    marginBottom: 20,\n" +
      '    textAlign: "center",\n' +
      '    color: "grey"\n' +
      "  },\n" +
      "  line: {\n" +
      "    fontSize: 12,\n" +
      '    color: "grey"\n' +
      "  },\n" +
      "  ID: {\n" +
      "    fontSize: 8,\n" +
      "    marginBottom: 20,\n" +
      '    textAlign: "left",\n' +
      '    color: "grey"\n' +
      "  },\n" +
      "  lineComp: {\n" +
      "    fontSize: 12,\n" +
      '    color: "grey",\n' +
      '    textAlign: "right"\n' +
      "  }\n" +
      "});\n\n" +
      "const MyDocument = () => (\n" +
      "  <Document>\n" +
      '   <Page size="A4" style={PDFstyle.body}>\n' +
      "      <Text style={PDFstyle.ID}>{certID}</Text>\n" +
      "      <Image style={PDFstyle.logo} src={keepLogo} />\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "      <Text style={PDFstyle.header}></Text>\n" +
      "    <Text style={PDFstyle.header}>Certificate of Recognition</Text>\n" +
      "    <Text style={PDFstyle.header}>This award is given to</Text>\n" +
      "    <Text style={PDFstyle.title}>{student_name}</Text>\n" +
      "    <Text style={PDFstyle.header}></Text>\n" +
      "    <Text style={PDFstyle.header}>for winning</Text>\n" +
      "    <Text style={PDFstyle.title}>\n" +
      "     {award} in {comp_name}\n" +
      "    </Text>\n" +
      "    <Text style={PDFstyle.header}></Text>\n" +
      "    <Text style={PDFstyle.header}>organised by {org_name}</Text>\n" +
      "    <Text style={PDFstyle.header}></Text>\n" +
      "    <Text style={PDFstyle.header}></Text>\n" +
      "    <Text style={PDFstyle.lineComp}>{date}</Text>\n" +
      "    </Page>\n" +
      "  </Document>\n" +
      ");\n"
    );
  }

  function showPDFComp() {
    setBoxStateComp("block");
    setBoxStateCourse("none");
    ReactDOM.render(<Comp />, document.getElementById("areaC"));
  }

  return (
    <div>
      <Paper>
        <Button color="warning" round onClick={() => showPDFCourse()}>
          Course PDF
        </Button>
        <Button color="warning" round onClick={() => showPDFComp()}>
          Competition PDF
        </Button>
      </Paper>
      <Box display={BoxStateCourse}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                disabled
                id="standard-multiline-static"
                label="@react-pdf code"
                multiline
                rows={20}
                defaultValue={defaultValueCourse()}
                fullWidth
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item xs={6}>
              <h1 id="areaB">PDF Viewer</h1>
              <p>
                For live REPL, visit{" "}
                <a href="https://react-pdf.org/repl" target="_blank">
                  https://react-pdf.org/repl
                </a>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box display={BoxStateComp}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                disabled
                id="standard-multiline-static"
                label="@react-pdf code"
                multiline
                rows={20}
                defaultValue={defaultValueComp()}
                fullWidth
                onChange={handleChangeInputC}
              />
            </Grid>

            <Grid item xs={6}>
              <h1 id="areaC">PDF Viewer</h1>
              <p>
                For live REPL, visit{" "}
                <a href="https://react-pdf.org/repl" target="_blank">
                  https://react-pdf.org/repl
                </a>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
