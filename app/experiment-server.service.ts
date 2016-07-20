import { Experiment } from './experiment';
import { Experimentgroup } from './experimentgroup';
import { User } from './user';
import { Configuration } from './configuration';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';



@Injectable()
export class ExperimentServerService {

  constructor(private http:Http) {}

  createExperiment(experiment: Experiment) {
    let body = JSON.stringify(
      {'name': experiment.name, 
      'startDatetime': experiment.startDatetime,
      'endDatetime': experiment.endDatetime,
      'experimentgroups': experiment.experimentgroups,
      'size': experiment.size
      });
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

  getExperimentgroup(id: number): Promise<Experimentgroup> {
    let url = 'http://127.0.0.1:6543/experimentgroups/' + id;
    return this.http.get(url)
             .toPromise()
             .then(this.extractData)
  }

  deleteExperiment(id: number) {
    let url = 'http://127.0.0.1:6543/experiments/' + id;
    this.http.delete(url)
             .toPromise()
    return true;
  }

  deleteExperimentgroup(id: number) {
    let url = 'http://127.0.0.1:6543/experimentgroups/' + id;
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

  deleteUserFromExperiment(userId: number, experimentId: number) {
    let url = 'http://127.0.0.1:6543/experiments/' + experimentId + '/users/' + userId;

    this.http.delete(url)
             .toPromise()
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

  getConfigurationsForUser(username: string): Promise<Configuration[]> {
    let headers = new Headers({'username': username});
    let options = new RequestOptions({headers: headers});
    return this.http
          .get('http://127.0.0.1:6543/configurations', options) 
          .toPromise()
          .then(this.extractData);
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