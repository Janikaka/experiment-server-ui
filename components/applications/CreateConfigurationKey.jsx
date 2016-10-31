import React from "react";
import {Link} from 'react-router'
import {SelectField, TextField, MenuItem, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import axios from 'axios';

const CreateConfigurationKey =
  React.createClass({

    getInitialState() {
      return {selectedValue: this.selectedAPIValueToValue(this.props.keyType), configurationKeyName: this.props.keyName};
    },

    handleSelection(event, index, value) {
      this.setState({selectedValue: value});
    },

    configurationKeyNameDidChange(event) {
      this.setState({configurationKeyName: event.target.value});
    },

    selectedValueToAPIValue(typeId) {
      switch (typeId) {
        case 1:
          return 'integer'
        case 2:
          return 'double'
        case 3:
          return 'boolean'
        case 4:
          return 'string'

      }
    },

    selectedAPIValueToValue(typeId) {
      switch (typeId) {
        case 'integer':
          return 1
        case 'double':
          return 2
        case 'boolean':
          return 3
        case 'string':
          return 4

      }
    },

    addConfigurationKey() {
      let _this = this;

      const appId = _this.props.appId
      const keyName = _this.state.configurationKeyName
      const selectedValue = this.selectedValueToAPIValue(_this.state.selectedValue)
      console.log(selectedValue);
      const keyData = {name: keyName, type: selectedValue, application_id: appId}
      this.serverRequest =
        axios
          // .post(`http://localhost:6543/applications/${appId}/configurationkeys`, keyData)
          .post(`https://experiment-server2016.herokuapp.com/applications/${appId}/configurationkeys`, keyData)
          .then(function(result) {
            console.log(result)
            window.location.reload() // TODO: Replace with Redux
          })
          .catch(function(err) {
            console.error(err)
          })
    },

    deleteConfigurationKey() {
      let _this = this;

      const keyId = this.props.keyId
      this.serverRequest =
        axios
          // .delete( "http://localhost:6543/configurationkeys/" + keyId)
          .delete( "https://experiment-server2016.herokuapp.com/configurationkeys/" + keyId)
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
      }

      return (
          <Row >
            <Col xs={12}>
                <Row center="xs" middle="xs">

                  <Col xs={6}>
                    <TextField hintText="Key" floatingLabelText="Key" onChange={this.configurationKeyNameDidChange} value={this.state.configurationKeyName} disabled={!!this.props.keyName} fullWidth={true}/>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.selectedValue} onChange={this.handleSelection} disabled={!!this.props.keyType} floatingLabelText="Type" fullWidth={true} >
                      <MenuItem value={1} primaryText="Integer" />
                      <MenuItem value={2} primaryText="Double" />
                      <MenuItem value={3} primaryText="Boolean" />
                      <MenuItem value={4} primaryText="String" />
                    </SelectField>
                  </Col>

                  <Col xs={1}>
                    <RaisedButton label="Save" primary={true} style={buttonStyle} disabled={!!this.props.keyName} fullWidth={true} onTouchTap={this.addConfigurationKey}/>
                  </Col>
                  <Col xs={2}>
                    <RaisedButton label="Delete" primary={false} style={buttonStyle} disabled={!!!this.props.keyName} fullWidth={true} onTouchTap={this.deleteConfigurationKey}/>
                  </Col>

                </Row>
            </Col>
          </Row>
      )
    }
  })

module.exports = CreateConfigurationKey
