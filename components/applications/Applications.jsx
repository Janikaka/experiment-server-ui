import React from "react";
import {Link, withRouter} from 'react-router'
import {Paper, RaisedButton, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import R from "ramda";
import axios from "axios";

import ApplicationComponent from './Application';


const Applications = withRouter(
  React.createClass({

    getInitialState() {
      return {applications: []}
    },

    componentDidMount() {
      let _this = this;

      this.serverRequest =
        axios
          .get("https://experiment-server2016.herokuapp.com/applications")
          .then(function(result) {

            _this.setState({
              applications: result.data
            });
          });
    },

    deleteApplication(id) {
      this.setState({
        applications: this.state.data.applications((_, i) => i !== id)
      });
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
                    <h1 className="mdl-layout-title">Applications</h1>
                  </Col>
                  <Col xs={2}>
                    <Link style={linkStyle} to="newapplication"><FloatingActionButton style={addStyle}>  <ContentAdd /> </FloatingActionButton></Link>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Paper style={paperStyle} zDepth={1}>

                {
                  this.state.applications.map(function(application) {
                    return <ApplicationComponent key={application.id} id={application.id} name={application.name} />;
                  })
                }

              </Paper>
            </Col>
          </Row>

        </Grid>
      )
    }
  })
)

module.exports = Applications
