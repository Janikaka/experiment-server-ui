import { Experiment } from './experiment';
import { User } from './user';

import { Injectable } from '@angular/core';



@Injectable()
export class ExperimentServerService {
  EXPERIMENTS = [new Experiment(1, 'first experiment'), new Experiment(2, 'second experiment')];
  USERS = [new User(1, 'first user'), new User(2, 'second user')]

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

  getExperimentsForUser(id: number) {
    return this.getExperiments();
  }

}