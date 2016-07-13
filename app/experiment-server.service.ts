import { Experiment } from './experiment';
import { User } from './user';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';



@Injectable()
export class ExperimentServerService {

  constructor(private http:Http) {}

  createExperiment(experiment: Experiment) {
    console.log("Experiment:" + experiment);
    let body = JSON.stringify({'name': experiment.name, 'experimentgroups': experiment.experimentgroups});
    let url = 'http://127.0.0.1:6543/experiments';
    this.http.post(url, body)
        .toPromise()
        .then(this.extractData);
    
  }

  getExperiments(): Promise<Experiment[]> {
    return this.http
        .get("http://127.0.0.1:6543/experiments")
        .toPromise()
        .then(this.extractData);
  }

  getExperiment(id: number): Promise<Experiment> {
    return this.http
        .get("http://127.0.0.1:6543/experiments/" + id + "/metadata")
        .toPromise()
        .then(this.extractData);
  }

  deleteExperiment(id: number) {
    let url = 'http://127.0.0.1:6543/experiments/' + id;
    this.http.delete(url)
             .toPromise()
    return true;
  }

  deleteUser(id: number) {
    let url = 'http://127.0.0.1:6543/users/' + id;

    this.http.delete(url)
             .toPromise()
    return true;
  }

  getUsersForExperiment(id: number) {
   return this.http
        .get('http://127.0.0.1:6543/experiments/' + id + '/users')
        .toPromise()
        .then(this.extractData);
  }

  getUsers(): Promise<User[]> {
    return this.http
        .get('http://127.0.0.1:6543/users')
        .toPromise()
        .then(this.extractData);
  }

  getUser(id: number) {
    return this.getUsers()
              .then(users => users.find(user => user.id === id));
  }

  getExperimentsForUser(id: number) {
    return this.http
        .get('http://127.0.0.1:6543/users/' + id + '/experiments')
        .toPromise()
        .then(this.extractData);
  }

  

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }



}