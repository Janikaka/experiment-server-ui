import React from "react";
import {Link, withRouter} from 'react-router'
import {Paper, RaisedButton, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import Experiment from "./Experiment";
// import ExperimentServerRESTService from "../../middleware/experiment-rest-service";

import axios from "axios";

const Experiments = withRouter(
  React.createClass({

    componentDidMount() {
      // this.getExperiments();
    },

    getExperiments() {
      // ExperimentServerRESTService().getExperiments();
    },

    render() {
      const paperStyle = {
        padding: 20,
        paddingLeft: 30,
        margin: 10
      };

      const headerStyle = {
        padding: 5,
        paddingLeft: 30,
        margin: 10
      };

      const statusHeaderStyle = {
          color: "#6d6d6d",
          fontSize: 28
      };

      const buttonStyle = {
        margin: 2
      };

      const addStyle = {
        margin: 10,
        float: "right"
      };

      const linkStyle = {
        textDecoration: 'none'
      };

      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper style={headerStyle} zDepth={2}>
                <Row middle="xs">
                  <Col xs={10}>
                    <h1 className="mdl-layout-title">Experiments</h1>
                  </Col>
                  <Col xs={2}>
                    <Link style={linkStyle} to="newexperiment"><FloatingActionButton style={addStyle}>  <ContentAdd /> </FloatingActionButton></Link>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>

                <h2 className="mdl-layout-title">Running</h2>
                <Row>
                  <Experiment />
                </Row>
              </Paper>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <h2 className="mdl-layout-title">Finished</h2>
                <Row>
                  <Experiment />
                  <Experiment />
                  <Experiment />
                  <Experiment />
                </Row>
              </Paper>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <h2 className="mdl-layout-title">Waiting</h2>
                <Row>
                  <Experiment />
                </Row>
              </Paper>
            </Col>
          </Row>
        </Grid>
      )
    }
  })
)

module.exports = Experiments
