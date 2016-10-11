import React from "react";
import {Link} from 'react-router'
import {Paper, RaisedButton, DatePicker, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import CreateConfiguration from './CreateConfiguration';

const CreateExperiment =
  React.createClass({

    getInitialState() {
      return {
        configurations: []
      }
    },

    addNewConfiguration() {
      this.setState({configurations: this.state.configurations.concat(<CreateConfiguration key={this.state.configurations.length} />)})
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
          <Row >
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <Row center="xs">
                  <Col xs={10}>
                    <TextField hintText="Experiment Group Name" floatingLabelText="Experiment Group Name" fullWidth={true}/>
                    <br />
                    <br />

                    <RaisedButton label="Add Configuration" onClick={this.addNewConfiguration} style={buttonStyle} fullWidth={true}/>

                    {
                      this.state.configurations.map(function(configuration) {
                        return configuration;
                      })
                    }

                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
      )
    }
  })

module.exports = CreateExperiment
