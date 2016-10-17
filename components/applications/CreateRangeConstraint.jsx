import React from "react";
import {Link} from 'react-router'
import {SelectField, TextField, MenuItem, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import axios from 'axios';

const CreateRangeConstraint =
  React.createClass({

    getInitialState() {
      return {selectedTypeValue: this.props.rangeOperatorId,
              selectedKeyValue: this.props.rangeConfigurationKeyId,
              rangeValue: this.props.rangeValue};
    },

    handleTypeSelection(event, index, value) {
      this.setState({selectedTypeValue: value});
    },

    handleKeySelection(event, index, value) {
      this.setState({selectedKeyValue: value});
    },

    handleValueChange(event) {
      this.setState({rangeValue: event.target.value});
    },

    addNewRangeConstraint() {
      let _this = this;

      const keyData = {configurationkey_id: this.state.selectedKeyValue, operator_id: this.state.selectedTypeValue, value: parseInt(this.state.rangeValue)}
      this.serverRequest =
        axios
          // .post(`http://localhost:6543/configurationkeys/${this.state.selectedKeyValue}/rangeconstraints`, keyData)
          .post('https://experiment-server2016.herokuapp.com/configurationkeys/${this.state.selectedKeyValue}/rangeconstraints', keyData)
          .then(function(result) {
            console.log(result)
            window.location.reload() // TODO: Replace with Redux
          })
          .catch(function(err) {
            console.error(err)
          })
    },

    removeRangeConstraint() {
      let _this = this;

      this.serverRequest =
        axios
          .delete( "http://localhost:6543/rangeconstraints/" + this.props.rangeId)
          // .delete( "https://experiment-server2016.herokuapp.com/rangeconstraints/" + this.props.rangeId)
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
      }

      return (
          <Row >
            <Col xs={12}>
                <Row center="xs" middle="xs">

                  {/*<Col xs={3}>
                    <TextField hintText="Key" floatingLabelText="Key" value={this.props.rangeConfigurationKeyName} disabled={!!this.props.rangeConfigurationKeyId} fullWidth={true}/>
                  </Col>*/}

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.selectedKeyValue} onChange={this.handleKeySelection} disabled={!!this.props.rangeConfigurationKeyId} floatingLabelText="Key" fullWidth={true} >
                      {
                        this.props.configurationKeys.map(function(configurationkey) {
                          return <MenuItem key={configurationkey.id} style={itemStyle} value={configurationkey.id} primaryText={configurationkey.name} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.selectedTypeValue} onChange={this.handleTypeSelection} disabled={!!this.props.rangeOperatorId} floatingLabelText="Type" fullWidth={true} >
                      {
                        this.props.rangeOperators.map(function(operator) {
                          return <MenuItem key={operator.id} style={itemStyle} value={operator.id} primaryText={operator.human_value} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <TextField hintText="Value" floatingLabelText="Value" value={this.props.rangeValue} onChange={this.handleValueChange} disabled={!!this.props.rangeConfigurationKeyId} fullWidth={true}/>
                  </Col>

                  <Col xs={1}>
                    <RaisedButton label="Save" primary={true} style={buttonStyle} onTouchTap={this.addNewRangeConstraint} disabled={!!this.props.rangeConfigurationKeyId} fullWidth={true}/>
                  </Col>
                  <Col xs={2}>
                    <RaisedButton label="Delete" primary={false} style={buttonStyle} onTouchTap={this.removeRangeConstraint} disabled={!!!this.props.rangeConfigurationKeyId} fullWidth={true}/>
                  </Col>

                </Row>
            </Col>
          </Row>
      )
    }
  })


module.exports = CreateRangeConstraint
