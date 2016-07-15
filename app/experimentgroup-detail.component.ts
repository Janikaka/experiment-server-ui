import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Experimentgroup } from './experimentgroup';
import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
	selector: 'Experimentgroup-detail',
	templateUrl: 'app/experimentgroup-detail.component.html'
})

export class ExperimentgroupDetailComponent implements OnInit, OnDestroy {
	experimentgroup: Experimentgroup;
	//experiment: Experiment;
	sub: any;

	constructor(
		private experimentServerService: ExperimentServerService,
		private router: Router,
		private route: ActivatedRoute
	){}

	ngOnInit() {
		//Do this better?
		this.sub = this.route.params.subscribe(params => {
      		let experimentId = +params['experimentId'];
      		let experimentgroupId = +params['experimentgroupId'];
      		this.experimentServerService.getExperiment(experimentId)
      			.then(experiment => {
      				for(let i = 0; i < experiment.experimentgroups.length; i++) {
    					if(experiment.experimentgroups[i].id == experimentgroupId) {
    						this.experimentgroup = experiment.experimentgroups[i];
    					}
    				}
    			})
    	});
	}

	goBack() {
		window.history.back();
	}

	deleteExperimentgroup() {
		this.experimentServerService.deleteExperimentgroup(this.experimentgroup.id);
	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

