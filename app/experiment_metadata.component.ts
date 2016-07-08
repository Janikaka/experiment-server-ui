import { Component, Input } from '@angular/core';
import { Experiment } from './experiment';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'experiment-metadata',
	templateUrl: 'app/experiment_metadata.component.html'
})

export class ExperimentMetadata {
	id: any;
  paramsSub: any;
  
  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10));
  }
  
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
