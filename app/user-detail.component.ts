import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { User } from './user';
import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'user-detail',
  templateUrl: 'app/user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  experiments: Experiment[];
  sub: any;
  selectedExperiment: Experiment;
  deleted: boolean //Remove this later

  constructor(
    private router: Router,
    private experimentServerService: ExperimentServerService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.experimentServerService.getUser(id)
        .then(user => this.user = user);
      this.experimentServerService.getExperimentsForUser(id)
        .then(experiments => this.experiments = experiments);
      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

  onSelect(experiment: Experiment) { 
    this.selectedExperiment = experiment; 
    this.router.navigate(['/experiments/' + this.selectedExperiment.id + '/users']);
  }

  deleteUser() {
    this.deleted = this.experimentServerService.deleteUser(this.user.id);
  }

}