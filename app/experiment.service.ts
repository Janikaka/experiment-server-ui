import { Experiment } from './experiment';
import { User } from './user';

import { Injectable } from '@angular/core';



@Injectable()
export class ExperimentService {
  EXPERIMENTS = [{id:1, name:'first experiment'}];
  USERS = [{id:1, username:'first user'}];

  getExperiments() {
    return Promise.resolve(this.EXPERIMENTS);
  }

  getUsers() {
    return Promise.resolve(this.USERS);
  }

  getExperiment(id: number) {
    return this.getExperiments()
               .then(experiments => experiments.find(experiment => experiment.id === id));
  }

  getUser(id: number) {
    return this.getUsers()
              .then(users => users.find(user => user.id === id));
  }

}