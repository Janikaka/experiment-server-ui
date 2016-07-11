import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './user';
import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'users-for-experiment',
  templateUrl: 'app/users-for-experiment.component.html',
})
export class UsersForExperimentComponent implements OnInit {
  sub: any;
  experiment: Experiment;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private experimentServerService: ExperimentServerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.experimentServerService.getExperiment(id)
        .then(experiment => this.experiment = experiment);
      this.experimentServerService.getUsersForExperiment(id)
        .then(users => this.users = users);
      
    });
  }

  goBack() {
    window.history.back();
  }
}