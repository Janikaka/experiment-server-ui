import React from "react";
import {Link, withRouter} from 'react-router'
import {Paper, RaisedButton, DatePicker, TextField} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import CreateConfigurationKey from './CreateConfigurationKey'
import CreateRangeConstraint from './CreateRangeConstraint'
import CreateExclusionConstraint from './CreateExclusionConstraint'

import axios from "axios";

const CreateApplication = withRouter(
  React.createClass({

    getInitialState() {
      return {
        applicationName: "",
        applicationId: null,
        configurationKeys: [],
        rangeConstraints: [],
        exclusionConstraints: [],
        configurationKeysNextId: 0,
        rangeConstraintsNextId: 0,
        exclusionConstraintsNextId: 0,
        operators: []
      }
    },

    componentDidMount() {
      let _this = this;

      this.serverRequest =
        axios
          .get("https://experiment-server2016.herokuapp.com/applications/" + this.props.params.id)
          .then(function(result) {
            _this.setState({
              applicationName: result.data.name,
              applicationId: result.data.id
            });
          });

      this.serverRequest =
        axios
          .get("https://experiment-server2016.herokuapp.com/operators")
          .then(function(result) {
            _this.setState({
              operators: result.data
            });
          });

      this.serverRequest =
        axios
          .get("https://experiment-server2016.herokuapp.com/applications/"
              + this.props.params.id + "/configurationkeys")
          .then(function(result) {

            _this.setState({
              configurationKeys: result.data
            });

            result.data.map(function(configurationkey) {
                axios
                  .get("https://experiment-server2016.herokuapp.com/configurationkeys/" + configurationkey.id + "/rangeconstraints")
                  .then(function(result) {
                    _this.setState({
                      rangeConstraints: _this.state.rangeConstraints.concat(result.data)
                    });
                  });
            })

            axios
              .get("https://experiment-server2016.herokuapp.com/exclusionconstraints")
              .then(function(result) {

                result.data.map(function(exclusionconstraint) {
                  _this.state.configurationKeys.map(function(configurationkey) {
                    if (exclusionconstraint.first_configurationkey_id === configurationkey.id) {
                      console.log(exclusionconstraint);
                      _this.setState({
                        exclusionConstraints: _this.state.exclusionConstraints.concat(exclusionconstraint)
                      });
                    }
                  })
                })
              });
          });


    },

    configureApplication() {
      this.props.router.replace('/applications');
    },

    addNewConfigurationKey() {
      this.setState({configurationKeys: this.state.configurationKeys.concat({id:this.state.configurationKeys.length + 1})})
    },

    addNewRangeConstraint() {
      this.setState({rangeConstraints: this.state.rangeConstraints.concat({id:this.state.rangeConstraints.length + 1})})
    },

    addNewExclusionConstraint() {
      this.setState({exclusionConstraints: this.state.exclusionConstraints.concat({id:this.state.exclusionConstraints.length + 1})})
    },

    deleteAllConfigurationKeys() {
      let _this = this;
      const appId = this.state.applicationId

      this.serverRequest =
        axios
          .delete(`https://experiment-server2016.herokuapp.com/applications/${appId}/configurationkeys`)
          .then(function(result) {
            console.log(result)
            window.location.reload() // TODO: Replace with Redux
          })
          .catch(function(err) {
            console.err(err)
          })
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

      let _this = this

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
                             appId={_this.state.applicationId}
                             />
                      })
                    }

                    <br />
                    <RaisedButton label="Remove All Configuration Keys" onTouchTap={this.deleteAllConfigurationKeys} style={buttonStyle} fullWidth={true}/>

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
                    <RaisedButton label="Add Exclusion Constraint" onClick={this.addNewExclusionConstraint} style={buttonStyle} fullWidth={true} />

                    {
                      this.state.exclusionConstraints.map(function(exclusionconstraint) {
                        return <CreateExclusionConstraint
                        key={exclusionconstraint.id}
                        id={exclusionconstraint.id}
                        appId={this.props.params.id}
                        keyAId={exclusionconstraint.first_configurationkey_id}
                        keyBId={exclusionconstraint.second_configurationkey_id}
                        typeAValue={exclusionconstraint.first_operator_id}
                        typeBValue={exclusionconstraint.second_operator_id}
                        keyAValue={exclusionconstraint.first_value_a}
                        keyBValue={exclusionconstraint.second_value_a}
                        exclusionOperators={this.state.operators}
                        configurationKeys={this.state.configurationKeys}
                        />;
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
                  <Col xs={6}>
                    <RaisedButton label="Configure Application" onTouchTap={this.configureApplication} primary={true} style={buttonStyle} fullWidth={true}/>
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
