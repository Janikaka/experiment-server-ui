import { provideRouter, RouterConfig }  from '@angular/router';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentDetailComponent } from './experiment-detail.component';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail.component';
import { UsersForExperimentComponent } from './users-for-experiment.component';
import { NewExperimentComponent } from './new-experiment.component';
import { ExperimentgroupDetailComponent } from './experimentgroup-detail.component';


export const routes: RouterConfig = [
  {
    path:'new_experiment',
    component: NewExperimentComponent
  },
  {
    path: 'experiments',
    component: ExperimentsComponent
  },
  {
    path: 'experiments/:id',
    component: ExperimentDetailComponent
  },
  {
    path: 'experiments/:id/users',
    component: UsersForExperimentComponent
  },
  {
    path: 'experimentgroups/:id',
    component: ExperimentgroupDetailComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/