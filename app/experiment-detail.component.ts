import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Experiment } from './experiment';
import { ExperimentService } from './experiment.service';

@Component({
  selector: 'experiment-detail',
  templateUrl: 'app/experiment-detail.component.html',
})
export class ExperimentDetailComponent implements OnInit, OnDestroy {
  experiment: Experiment;
  sub: any;

  constructor(
    private experimentService: ExperimentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.experimentService.getExperiment(id)
        .then(experiment => this.experiment = experiment);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }
}