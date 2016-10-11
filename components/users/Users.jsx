import React from "react";
import {Paper} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

const Experiment = React.createClass({
    render() {

      const paperStyle = {
        padding: 20,
        margin: 10
      };

      const headerStyle = {
        padding: 5,
        paddingLeft: 30,
        margin: 10
      };

      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper style={headerStyle} zDepth={2}>
                <h1 className="mdl-layout-title">Users</h1>
              </Paper>
            </Col>
          </Row>
        </Grid>
      )
    }
  })

  module.exports = Experiment
