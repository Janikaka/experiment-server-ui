import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';


@Component({
  selector: 'experiments',
  templateUrl: 'app/experiments.component.html',
})
export class ExperimentsComponent implements OnInit {
  experiments: Experiment[];
  selectedExperiment: Experiment;

  constructor(
    private router: Router,
    private experimentServerService: ExperimentServerService) { }

  getExperiments() {
    this.experimentServerService.getExperiments().then(experiments => this.experiments = experiments);
  }

  ngOnInit() {
    this.getExperiments();
  }

  onSelect(experiment: Experiment) { this.selectedExperiment = experiment; }

  showMetadata() {
    this.router.navigate(['/experiments', this.selectedExperiment.id]);
  }

  showUsers() {
    this.router.navigate(['/experiments/' + this.selectedExperiment.id + '/users']);
  }

  createExperiment() {
    this.router.navigate(['new_experiment']);
  }

}