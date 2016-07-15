import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'experiment-detail',
  templateUrl: 'app/experiment-detail.component.html',
})
export class ExperimentDetailComponent implements OnInit, OnDestroy {
  experiment: Experiment;
  deleted = false; //Remove this later
  sub: any;

  constructor(
    private experimentServerService: ExperimentServerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.experimentServerService.getExperiment(id)
        .then(experiment => this.experiment = experiment);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

  showUsers() {
    this.router.navigate(['/experiments/' + this.experiment.id + '/users']);
  }

  deleteExperiment() {
    this.deleted = this.experimentServerService.deleteExperiment(this.experiment.id);
  }
}