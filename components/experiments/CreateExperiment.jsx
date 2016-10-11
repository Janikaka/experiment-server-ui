import React from "react";
import {Link} from 'react-router'
import {Paper, RaisedButton, DatePicker, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import CreateExperimentGroup from './CreateExperimentGroup';

const CreateExperiment =
  React.createClass({

    getInitialState() {
      return {
        experimentGroups: []
      }
    },

    addNewExperimentGroup() {
      this.setState({experimentGroups: this.state.experimentGroups.concat(<CreateExperimentGroup key={this.state.experimentGroups.length} />)})
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

      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper style={headerStyle} zDepth={2}>
                <Row>
                  <Col xs={12}>
                    <h1 className="mdl-layout-title">Create New Experiment</h1>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

          <Row >
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <Row center="xs">
                  <Col xs={10}>
                    <TextField hintText="Experiment Name" floatingLabelText="Experiment Name" fullWidth={true}/>
                    <br />
                    <br />
                    <DatePicker hintText="Start Date" fullWidth={true} />
                    <br />
                    <DatePicker hintText="End Date" fullWidth={true} />
                    <TextField hintText="Size" floatingLabelText="Size" fullWidth={true} />
                    <br /><br />
                    <RaisedButton label="Add Experiment Group" onClick={this.addNewExperimentGroup} style={buttonStyle} fullWidth={true}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

          {
            this.state.experimentGroups.map(function(experimentGroup) {
              return experimentGroup;
            })
          }

          <Row >
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <Row center="xs">
                  <Col xs={6}>
                    <RaisedButton label="Create Experiment" primary={true} style={buttonStyle} fullWidth={true}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

        </Grid>
      )
    }
  })


module.exports = CreateExperiment
