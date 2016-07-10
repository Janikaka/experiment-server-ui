import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'experiment-detail',
  templateUrl: 'app/experiment-detail.component.html',
})
export class ExperimentDetailComponent implements OnInit, OnDestroy {
  experiment: Experiment;
  sub: any;

  constructor(
    private experimentServerService: ExperimentServerService,
    private route: ActivatedRoute) {
  }

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
}