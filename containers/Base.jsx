import React, { Component, PropTypes } from "react";
import {Link, withRouter} from 'react-router'
import {AppBar, IconButton, MenuItem, Drawer} from 'material-ui';

const Base = withRouter(
  React.createClass({
    getInitialState() {
      return {
        open: false
      }
    },

    handleToggle() {
      this.setState({open: !this.state.open})
    },

    handleClose() {
      this.setState({open: false})
    },

    render() {
      const linkStyle = {
        textDecoration: 'none'
      }

      return (
        <div>
          <header>
            <AppBar
              title="Experiment Server UI"
              iconElementLeft={<IconButton onTouchTap={this.handleToggle} iconClassName="material-icons">menu</IconButton>}
            />
          </header>

          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
              <br />
              <Link style={linkStyle} onTouchTap={this.handleClose} to="applications"><MenuItem primaryText="Applications" /></Link>
          </Drawer>

          {this.props.children}

        </div>
      );
    }
  })
)

module.exports = Base;
