import React from "react";
import {Link} from 'react-router'
import {Paper, FlatButton, RaisedButton, Dialog} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import axios from 'axios';

const Application = React.createClass({

    getInitialState() {
      return {deleteDialogOpen: false};
    },

    handleDeleteDialogOpen() {
      this.setState({deleteDialogOpen: true});
    },

    handleDeleteDialogClose() {
      this.setState({deleteDialogOpen: false});
    },

    deleteApplication() {
      this.setState({deleteDialogOpen: false});

      let _this = this;

      this.serverRequest =
        axios
          .delete( "http://127.0.0.1:6543/applications/" + this.props.id)
          .then(function(result) {
            this.props.deleteApplication(this.props.id)
          });
    },

    render() {
      const paperStyle = {
        padding: 20,
        margin: 5,
        backgroundColor: "#f7f7f7"
      };

      const headerStyle = {
        color: "#5d5d5d",
        padding: 20,
        marginBottom: 40,
        textAlign: "center"
      };

      const buttonStyle = {
        margin: 2
      };

      const actions = [
        <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.handleDeleteDialogClose}
        />,
        <FlatButton
          label="Delete"
          primary={true}
          onTouchTap={this.deleteApplication}
        />
      ];

      return (
        <div>

          <Dialog
            title={"Delete " + this.props.name + "?"}
            actions={actions}
            modal={false}
            open={this.state.deleteDialogOpen}
            onRequestClose={this.handleDeleteDialogClose}
          >
            Are you sure you want to delete this application?
          </Dialog>

          <Paper style={paperStyle} zDepth={1}>
            <Row middle="xs">
              <Col xs={9}>
                <h4 style={headerStyle}>{this.props.name}</h4>
              </Col>
              <Col xs={3}>
                <Link to="experiments"><RaisedButton style={buttonStyle} primary={true} label="Experiments" fullWidth={true}  /></Link>
                <Link to={'configureapplication/' + this.props.id}><RaisedButton style={buttonStyle} primary={false} label="Configure Application" fullWidth={true} /></Link>
                <Link to=""><RaisedButton style={buttonStyle} primary={false} label="Delete Application" onClick={this.handleDeleteDialogOpen} fullWidth={true} /></Link>
              </Col>
            </Row>
          </Paper>
          <br />
        </div>
      )
    }
  })

  module.exports = Application
