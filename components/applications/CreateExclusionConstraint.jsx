import React from "react";
import {Link} from 'react-router'
import {SelectField, TextField, MenuItem, RaisedButton, Divider} from 'material-ui';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

const CreateExclusionConstraint =
  React.createClass({

    getInitialState() {
      return {selectedTypeAValue: this.props.typeAValue, selectedTypeBValue: this.props.typeBValue,
              selectedKeyAValue: this.props.keyAValue, selectedKeyBValue: this.props.keyBValue,
              exclusionValueA: this.props.exclusionValueA, exclusionValueB: this.props.exclusionValueB};
    },

    handleTypeASelection(event, index, value) {
      this.setState({selectedTypeAValue: value});
    },

    handleTypeBSelection(event, index, value) {
      this.setState({selectedTypeBValue: value});
    },

    handleKeyASelection(event, index, value) {
      this.setState({selectedKeyAValue: value});
    },

    handleKeyBSelection(event, index, value) {
      this.setState({selectedKeyBValue: value});
    },

    handleValueAChange(event) {
      this.setState({exclusionValueA: event.target.value});
    },

    handleValueBChange(event) {
      this.setState({exclusionValueB: event.target.value});
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
                    <SelectField style={selectStyle} value={this.state.selectedKeyAValue} onChange={this.handleKeyASelection} floatingLabelText="Key" fullWidth={true} >
                      {
                        this.props.configurationKeys.map(function(configurationkey) {
                          return <MenuItem key={configurationkey.id} style={itemStyle} value={configurationkey.id} primaryText={configurationkey.name} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.selectedTypeAValue} onChange={this.handleTypeASelection} floatingLabelText="Operator" fullWidth={true} >
                    {
                      this.props.exclusionOperators.map(function(operator) {
                        return <MenuItem key={operator.id} style={itemStyle} value={operator.id} primaryText={operator.human_value} />
                      })
                    }
                    </SelectField>
                  </Col>

                  <Col xs={4}>
                    <TextField hintText="Value" value={this.props.exclusionValueA} onChange={this.handleValueAChange} floatingLabelText="Value" fullWidth={true}/>
                  </Col>

                </Row>

                <Row middle="xs" center="xs">
                  <Col  xs={1}>
                    THEN
                  </Col>
                  <Col xs={4}>
                    <SelectField style={selectStyle} value={this.state.selectedKeyBValue} onChange={this.handleKeyBSelection} floatingLabelText="Key" fullWidth={true} >
                      {
                        this.props.configurationKeys.map(function(configurationkey) {
                          return <MenuItem key={configurationkey.id} style={itemStyle} value={configurationkey.id} primaryText={configurationkey.name} />
                        })
                      }
                    </SelectField>
                  </Col>

                  <Col xs={3}>
                    <SelectField style={selectStyle} value={this.state.selectedTypeBValue} onChange={this.handleTypeBSelection} floatingLabelText="Operator" fullWidth={true} >
                    {
                      this.props.exclusionOperators.map(function(operator) {
                        return <MenuItem key={operator.id} style={itemStyle} value={operator.id} primaryText={operator.human_value} />
                      })
                    }
                    </SelectField>
                  </Col>

                  <Col xs={4}>
                    <TextField hintText="Value" value={this.props.exclusionValueB} onChange={this.handleValueBChange} floatingLabelText="Value" fullWidth={true}/>
                  </Col>

                </Row>

                <Row center="xs">

                  <Col xs={6}>
                    <RaisedButton label="Save" primary={true} style={buttonStyle} fullWidth={true}/>
                  </Col>
                  <Col xs={6}>
                    <RaisedButton label="Delete" style={buttonStyle} fullWidth={true}/>
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
