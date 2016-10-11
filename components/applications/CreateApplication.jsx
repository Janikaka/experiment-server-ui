import React from "react";
import {Link, withRouter} from 'react-router'
import {Paper, RaisedButton, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import axios from "axios";

const CreateApplication = withRouter(
  React.createClass({

    getInitialState() {
      return {applicationName: ""}
    },

    applicationNameDidChange(event) {
      this.setState({applicationName: event.target.value});
    },

    createApplication() {
      let _this = this;

      let instance = axios.create({
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      instance
        // .get("http://experiment-server2016.heroku.com/applications")
        .post("http://localhost:6543/applications", {name: this.state.applicationName})
        .then(function(result) {
          console.log(result);
        }).catch(function (response) {
          console.log(response);
        });

      this.props.router.replace('/configureapplication')
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
                    <h1 className="mdl-layout-title">Create New Application</h1>
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
                    <TextField onChange={this.applicationNameDidChange} value={this.state.applicationName} hintText="Application Name" floatingLabelText="Application Name" fullWidth={true}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>


          <Row >
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>
                <Row center="xs">
                  <Col xs={6}>
                    <RaisedButton label="Create Application" primary={true} style={buttonStyle} onTouchTap={this.createApplication} fullWidth={true}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

        </Grid>
      )
    }
  })
)

module.exports = CreateApplication
