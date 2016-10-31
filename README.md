# experiment-server-react-ui
Experiment Server Web UI - Built with React, React-Router, Axios, Ramda and Material-UI.
Live version available [here](https://experiment-server-ui.herokuapp.com).

## Installation
`npm install`

## Launch
`npm start`

Dependencies are version locked using [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap).

## Dependencies
* [React](https://facebook.github.io/react/)
* [Material UI](http://material-ui.com/#/)
* [webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)

## Component Summary
### Base
Contains the navigation component and acts as the main application container.

### Applications
Lists all active application, allows the creation and modification of applications.

* Applications: Container component that contains all application summary components
* Application: Summary component that allows more detailed access to a specific application
* CreateApplication: Contains application creation logic
* ConfigureApplication: Core component used to modify and configure an application, parent component to CreateConfigurationKey, CreateRangeConstraint, CreateExclusionConstraint
* CreateConfigurationKey: Configuration Key component, allow creation and deletion of configuration keys for a specific application
* CreateRangeConstraint: Range Constraint component, allows creation and deletion of range constraints for a specific configuration key
* CreateExclusionConstraint: Exclusion Constraint component, allows creation and deletion of exclusion constraints for a specific application

### Experiments
Lists all running, waiting and completed experiments for a specific application, allows creation and modification of experiments.

* Experiments: Container component that contains all experiment summary components
* Experiment: Summary component that allows more detailed access to a specific experiment
* CreateExperiment: Core component used to create and modify an experiment, parent component to CreateExperimentGroup
* CreateExperimentGroup: Experiment Group component, parent component to CreateConfiguration
* CreateConfiguration: Experiment Group Configuration component, allows creation and deletion of key-value pair configurations

## TODO
* Implement Flux (Redux) data flow to allow child components to communicate data changes. Remove update refresh hack.
* Exclusion constraints: Adding and Deleting, check server headers.
* Exclusion constraints: Implement dynamic components that pattern match the input
* Exclusion constraints: Create second set of operators for "then" condition.
* Client side form validation on all components that have user input
* Complete Experiment components and link the data source
* Implement User components
* Epic: Update UI to include assignment logic
* Epic: Implement User Simulator
