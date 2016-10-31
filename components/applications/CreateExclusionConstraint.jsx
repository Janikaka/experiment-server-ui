import React from "react";
import {Link} from 'react-router'
import {SelectField, TextField, MenuItem, RaisedButton, Divider} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import axios from 'axios';

const CreateExclusionConstraint =
  React.createClass({

    // key={exclusionconstraint.id}
    // keyAId={exclusionconstraint.first_configurationkey_id}
    // keyBId={exclusionconstraint.second_configurationkey_id}
    // typeAValue={exclusionconstraint.first_operator_id}
    // typeBValue={exclusionconstraint.second_operator_id}
    // keyAValue={exclusionconstraint.first_value_a}
    // keyBValue={exclusionconstraint.second_value_a}
    // exclusionOperators={this.state.operators}
    // configurationKeys={this.state.configurationKeys}

    getInitialState() {
      return {typeAValue: this.props.typeAValue, typeBValue: this.props.typeBValue,
              keyAValue: this.props.keyAValue, keyBValue: this.props.keyBValue,
              keyAId: this.props.keyAId, keyBId: this.props.keyBId};
    },

    handleTypeASelection(event, index, value) {
      this.setState({typeAValue: value});
    },

    handleTypeBSelection(event, index, value) {
      this.setState({typeBValue: value});
    },

    handleKeyASelection(event, index, value) {
      this.setState({keyAId: value});
    },

    handleKeyBSelection(event, index, value) {
      this.setState({keyBId: value});
    },

    handleValueAChange(event) {
      this.setState({keyAValue: event.target.value});
    },

    handleValueBChange(event) {
      this.setState({keyBValue: event.target.value});
    },

    addNewExclusionConstraint() {
      let _this = this;

      const exclusionData = {first_configurationkey_id: this.state.keyAId, first_operator_id: this.state.typeAValue, first_value_a: this.state.keyAValue,
                            second_configurationkey_id: this.state.keyBId, second_operator_id: this.state.typeBValue, second_value_a: this.state.keyBValue}

      this.serverRequest =
        axios
          .post("https://experiment-server2016.herokuapp.com/applications/" + _this.props.appId + "/exclusionconstraints", exclusionData)
          .then(function(result) {
            console.log(result)
            window.location.reload() // TODO: Replace with Redux
          })
          .catch(function(err) {
            console.error(err)
          })
    },

    removeExclusionConstraint() {
      let _this = this;

      this.serverRequest =
        axios
          .delete( "https://experiment-server2016.herokuapp.com/exclusionconstraints/" + this.props.id)
          .then(function(result) {
            console.log(result)
            window.location.reload() // TODO: Replace with Redux
          })
          .catch(function(err) {
            console.error(err)
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

      const selectStyle = {
        textAlign: "left"
      };

      const itemStyle = {
        textAlign: "left"
      };

      return (
          <Row>
            <Col xs={12}>
                <Row middle="xs" center="xs">
                <Col  xs={1}>
                  IF
                </Col>
                  <Col xs={4}>
                    <SelectField style={selectStyle} value={this.state.keyAId} disabled={!!this.props.keyAId} onChange={this.handleKeyASelection} floatingLabelText="Key" fullWidth={true} >
                      {
                        this.props.configurationKeys.map(function(configurationkey) {
                          return <MenuItem key={configurationkey.id} style={itemStyle} value={configurationkey.id} primaryText={configurationkey.name} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.typeAValue} disabled={!!this.props.keyAId} onChange={this.handleTypeASelection} floatingLabelText="Operator" fullWidth={true} >
                    {
                      this.props.exclusionOperators.map(function(operator) {
                        return <MenuItem key={operator.id} style={itemStyle} value={operator.id} primaryText={operator.human_value} />
                      })
                    }
                    </SelectField>
                  </Col>

                  <Col xs={4}>
                    <TextField hintText="Value" value={this.state.keyAValue} disabled={!!this.props.keyAId} onChange={this.handleValueAChange} floatingLabelText="Value" fullWidth={true}/>
                  </Col>

                </Row>

                <Row middle="xs" center="xs">
                  <Col  xs={1}>
                    THEN
                  </Col>
                  <Col xs={4}>
                    <SelectField style={selectStyle} value={this.state.keyBId} disabled={!!this.props.keyAId} onChange={this.handleKeyBSelection} floatingLabelText="Key" fullWidth={true} >
                      {
                        this.props.configurationKeys.map(function(configurationkey) {
                          return <MenuItem key={configurationkey.id} style={itemStyle} value={configurationkey.id} primaryText={configurationkey.name} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.typeBValue} disabled={!!this.props.keyAId} onChange={this.handleTypeBSelection} floatingLabelText="Operator" fullWidth={true} >
                    {
                      this.props.exclusionOperators.map(function(operator) {
                        return <MenuItem key={operator.id} style={itemStyle} value={operator.id} primaryText={operator.human_value} />
                      })
                    }
                    </SelectField>
                  </Col>

                  <Col xs={4}>
                    <TextField hintText="Value" value={this.state.keyBValue} disabled={!!this.props.keyAId} onChange={this.handleValueBChange} floatingLabelText="Value" fullWidth={true}/>
                  </Col>

                </Row>

                <Row center="xs">

                  <Col xs={6}>
                    <RaisedButton label="Save"  onTouchTap={this.addNewExclusionConstraint} disabled={!!this.props.keyAId} primary={true} style={buttonStyle} fullWidth={true}/>
                  </Col>
                  <Col xs={6}>
                    <RaisedButton label="Delete" onTouchTap={this.removeExclusionConstraint} disabled={!!!this.props.keyAId} style={buttonStyle} fullWidth={true}/>
                  </Col>

                </Row>

                <br />
                <Divider />
            </Col>
          </Row>
      )
    }
  })

module.exports = CreateExclusionConstraint
