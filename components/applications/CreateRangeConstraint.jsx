import React from "react";
import {Link} from 'react-router'
import {SelectField, TextField, MenuItem, RaisedButton} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

const CreateRangeConstraint =
  React.createClass({

    getInitialState() {
      return {selectedTypeValue: this.props.rangeOperatorId,
              selectedKeyValue: this.props.rangeConfigurationKeyId};
    },

    handleTypeSelection(event, index, value) {
      this.setState({selectedTypeValue: value});
    },

    handleKeySelection(event, index, value) {
      this.setState({selectedKeyValue: value});
    } ,

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
                    <TextField hintText="Value" floatingLabelText="Value" value={this.props.rangeValue} disabled={!!this.props.rangeValue} fullWidth={true}/>
                  </Col>

                  <Col xs={1}>
                    <RaisedButton label="Save" primary={true} style={buttonStyle} disabled={!!this.props.rangeConfigurationKeyId} fullWidth={true}/>
                  </Col>
                  <Col xs={2}>
                    <RaisedButton label="Delete" primary={false} style={buttonStyle} fullWidth={true}/>
                  </Col>

                </Row>
            </Col>
          </Row>
      )
    }
  })


module.exports = CreateRangeConstraint
