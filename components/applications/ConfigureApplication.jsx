import React from "react";
import {Link} from 'react-router'
import {Paper, RaisedButton, DatePicker, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import CreateConfigurationKey from './CreateConfigurationKey'
import CreateRangeConstraint from './CreateRangeConstraint'
import CreateExclusionConstraint from './CreateExclusionConstraint'

import axios from "axios";

const CreateApplication =
  React.createClass({

    getInitialState() {
      return {
        applicationName: "",
        configurationKeys: [],
        rangeConstraints: [],
        exclusionConstraints: [],
        operators: []
      }
    },

    componentDidMount() {
      let _this = this;

      this.serverRequest =
        axios
          .get("http://localhost:6543/applications/" + this.props.params.id)
          .then(function(result) {
            _this.setState({
              applicationName: result.data.name
            });
          });

      this.serverRequest =
        axios
          .get("http://localhost:6543/operators")
          .then(function(result) {
            _this.setState({
              operators: result.data
            });
          });

      this.serverRequest =
        axios
          .get("http://localhost:6543/applications/"
              + this.props.params.id + "/configurationkeys")
          .then(function(result) {

            _this.setState({
              configurationKeys: result.data
            });

            result.data.map(function(configurationkey) {
                axios
                  .get("http://localhost:6543/configurationkeys/" + configurationkey.id + "/rangeconstraints")
                  .then(function(result) {
                    _this.setState({
                      rangeConstraints: _this.state.rangeConstraints.concat(result.data)
                    });
                  });
            })
          });
    },

    addNewConfigurationKey() {
      this.setState({configurationKeys: this.state.configurationKeys.concat({id:this.state.configurationKeys.length + 1})})
    },

    addNewRangeConstraint() {
      this.setState({rangeConstraints: this.state.rangeConstraints.concat({id:this.state.rangeConstraints.length + 1})})
    },

    addNewExclusionConstraint() {
      this.setState({exclusionConstraints: this.state.exclusionConstraints.concat(<CreateExclusionConstraint key={this.state.exclusionConstraints.length} />)})
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
                    <h1 className="mdl-layout-title">Configure Application</h1>
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
                    <TextField hintText="Application Name" floatingLabelText="Application Name" value={this.state.applicationName} disabled={true} fullWidth={true}/>
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
                    <RaisedButton label="Add Configuration Key" onClick={this.addNewConfigurationKey} style={buttonStyle} fullWidth={true}/>

                    {
                      this.state.configurationKeys.map(function(configurationkey) {
                        return <CreateConfigurationKey
                             key={configurationkey.id}
                             keyId={configurationkey.id}
                             keyName={configurationkey.name}
                             keyType={configurationkey.type}
                             />
                      })
                    }

                    <br />
                    <RaisedButton label="Remove All Configuration Keys" style={buttonStyle} fullWidth={true}/>

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
                    <RaisedButton label="Add Range Constraint" onClick={this.addNewRangeConstraint} style={buttonStyle} fullWidth={true}/>

                    {
                      this.state.rangeConstraints.map(function(rangeconstraint) {

                        function confKey(key) {
                          return key.id === rangeconstraint.configurationkey_id;
                        }

                        let configurationkey = this.state.configurationKeys.find(confKey)
                        if (!configurationkey) {
                          configurationkey = {name:""}
                        }

                        return <CreateRangeConstraint
                          key={rangeconstraint.id}
                          rangeId={rangeconstraint.id}
                          rangeConfigurationKeyId={rangeconstraint.configurationkey_id}
                          rangeOperatorId={rangeconstraint.operator_id}
                          rangeValue={rangeconstraint.value}
                          rangeConfigurationKeyName={configurationkey.name}
                          rangeOperators={this.state.operators}
                          configurationKeys={this.state.configurationKeys}
                          />

                      }.bind(this))
                    }

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
                    <RaisedButton label="Add Exclusion Constraint" onClick={this.addNewExclusionConstraint} style={buttonStyle} fullWidth={true} disabled={true} />

                    {
                      this.state.exclusionConstraints.map(function(exclusionConstraint) {
                        return exclusionConstraint;
                      })
                    }

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
                    <RaisedButton label="Configure Application" primary={true} style={buttonStyle} fullWidth={true}/>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>

        </Grid>
      )
    }
  })

module.exports = CreateApplication
