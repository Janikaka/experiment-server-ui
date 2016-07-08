import { provideRouter, RouterConfig }  from '@angular/router';

import { AllExperiments } from './all_experiments.component';
import { AllUsers } from './all_users.component';
import { ExperimentMetadata } from './experiment_metadata.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'experiments',
    component: AllExperiments
  },
  {
    path: 'experiments/:id',
    component: ExperimentMetadata
  },
  {
    path: 'users',
    component: AllUsers
  },

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
