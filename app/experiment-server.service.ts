import { Experiment } from './experiment';
import { User } from './user';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';



@Injectable()
export class ExperimentServerService {
  //EXPERIMENTS = [new Experiment(1, 'first experiment'), new Experiment(2, 'second experiment')];
  //USERS = [new User(1, 'first user'), new User(2, 'second user')]

  constructor(public http:Http) {

  }

  createExperiment(experiment: Experiment) {
    let result = experiment.id + ", " + experiment.name + ", ";
    for(let i = 0; i < experiment.experimentgroups.length; i++) {
      let expgroup = experiment.experimentgroups[i];
      result += expgroup.experimentgroup + ", " + expgroup.confKey + ", " + expgroup.confValue + "\n";
    }

    console.log("CREATE EXPERIMENT: " + result);
    //TODO
  }

  getExperiments(): Promise<Experiment[]>{
      return this.http
        .get('app/experiments.json')
        //.get('http://127.0.0.1:6543/experiments')
        .toPromise()
        .then(this.extractData);
  }

  getExperiment(id: number) {
    return this.getExperiments()
               .then(experiments => experiments.find(experiment => experiment.id === id));
  }

  deleteExperiment(id: number) {
    return true;
    /*
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = 'http://127.0.0.1:6543/experiments' + id;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
    */
  }

  deleteUser(id: number) {
    return true;
    /*
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = 'http://127.0.0.1:6543/users' + id;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
    */
  }

  getUsersForExperiment(id: number) {
   /*return this.http
        .get('http://127.0.0.1:6543/experiments/' + id + '/users')
        .toPromise()
        .then(this.extractData);
  */
    return this.getUsers();
  }

  getUsers(): Promise<User[]> {
    return this.http
        .get('app/users.json')
        //.get('http://127.0.0.1:6543/users')
        .toPromise()
        .then(this.extractData);
  }

  getUser(id: number) {
    return this.getUsers()
              .then(users => users.find(user => user.id === id));
  }

  getExperimentsForUser(id: number) {
  /*return this.http
        .get('http://127.0.0.1:6543/user/' + id + '/experiments')
        .toPromise()
        .then(this.extractData);
  */
    return this.getExperiments();
  }

  

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}