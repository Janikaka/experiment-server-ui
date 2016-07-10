import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Experiment } from './experiment';
import { ExperimentService } from './experiment.service';

@Component({
  selector: 'experiments',
  templateUrl: 'app/experiments.component.html',
})
export class ExperimentsComponent implements OnInit {
  experiments: Experiment[];
  selectedExperiment: Experiment;

  constructor(
    private router: Router,
    private experimentService: ExperimentService) { }

  getExperiments() {
    this.experimentService.getExperiments().then(experiments => this.experiments = experiments);
  }

  ngOnInit() {
    this.getExperiments();
  }

  onSelect(experiment: Experiment) { this.selectedExperiment = experiment; }

  gotoDetail() {
    this.router.navigate(['/experiments', this.selectedExperiment.id]);
  }

}