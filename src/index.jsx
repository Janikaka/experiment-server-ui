import React from "react";
import ReactDOM from "react-dom";
import { browserHistory, Navigation, hashHistory, Router, Route, Link, withRouter, useRouterHistory, IndexRedirect } from 'react-router'
import injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo900, indigo400, indigo500, lightBlack, grey100, grey500, darkBlack, white, grey300} from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';

import Base from '../containers/Base';
import Experiments from '../components/experiments/Experiments';
import Experiment from '../components/experiments/Experiment';
import CreateExperiment from '../components/experiments/CreateExperiment';
import Users from '../components/users/Users';

import Applications from "../components/applications/Applications"
import CreateApplication from "../components/applications/CreateApplication"
import ConfigureApplication from "../components/applications/ConfigureApplication"

window.React = React;

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
    primary2Color: indigo400,
    primary3Color: lightBlack,
    accent1Color: indigo900,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: indigo400
  }
});

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
     <Router history={hashHistory}>
     {/*<Router history={browserHistory}>*/}
      <Route path="/" component={Base} >
        <IndexRedirect to="/applications" />
        {/*<Route path="login" component={Login} />*/}
        {/*<Route path="logout" component={Logout} />*/}

        <Route name="applications" path="applications" component={Applications} />
        <Route name="application" path="applications/:id" component={Applications} />
        <Route name="newapplication" path="newapplication" component={CreateApplication} />
        <Route name="configureapplication" path="configureapplication/:id" component={ConfigureApplication} />


        <Route name="experiments" path="experiments" component={Experiments} />
        <Route name="newexperiment" path="newexperiment" component={CreateExperiment} />
        {/*<Route name="experiment" path="experiments/:id" component={Experiment} />*/}
        {/*<Route name="experimentusers" path="experiments/:id/users" component={ExperimentUsers} />*/}
        {/*<Route name="experimentgroup" path="experiments/:id/experimentgroups/:groupid" component={ExperimentGroup} />*/}

        <Route name="users" path="users" component={Users} />
        {/*<Route name="user" path="users/:id" component={User} />*/}

      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById("root"))
