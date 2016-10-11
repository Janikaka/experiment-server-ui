import React from "react";
import {Link} from 'react-router'
import {Paper, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

const Experiment = React.createClass({
    render() {
      const paperStyle = {
        padding: 20,
        margin: 5,
        width: 300,
        height: 300,
        backgroundColor: "#f7f7f7"
      };

      const headerStyle = {
        color: "#5d5d5d",
        padding: 20,
        marginBottom: 40,
        textAlign: "center"
      }

      const buttonStyle = {
        margin: 2
      }

      return (
        <Col xs={4}>
          <Paper style={paperStyle} zDepth={1}>
            <h4 style={headerStyle}>Experiment Name</h4>
            <Link to=""><RaisedButton style={buttonStyle} primary={true} label="Details" fullWidth={true} /></Link>
            <Link to=""><RaisedButton style={buttonStyle} primary={false} label="Users" fullWidth={true} /></Link>
            <Link to=""><RaisedButton style={buttonStyle} primary={false} label="Delete" fullWidth={true} /></Link>
          </Paper>
          <br />
        </Col>
      )
    }
  })

  module.exports = Experiment
