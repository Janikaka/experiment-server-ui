import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Experiment } from './experiment';
import { Experimentgroup } from './experimentgroup'
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'new-experiment',
  templateUrl: 'app/new-experiment.component.html'
})
export class NewExperimentComponent {
	constructor(
    	private experimentServerService: ExperimentServerService) {
  	}
	model = new Experiment(null, '', [], null, null, null);
	submitted = false;
	
	experimentgroups = [];
	addExperimentgroup() {
		this.experimentgroups.push({'id': this.experimentgroups.length+1, 'name':'', 'configurations':[]});
	}
	addConf(id) {
		this.experimentgroups[id-1]['configurations'].push({'id':this.experimentgroups[id-1]['configurations'].length+1, 'key':'', 'value': null});
	}
	onSubmit() { 
		this.submitted = true;
		this.model.experimentgroups = [];
		for(let j = 1; j <= this.experimentgroups.length; j++) {
			let name = document.getElementById("" +j)['value'];
			let experimentgroup = {'id':null,'name': name, 'configurations': [], 'totalDataitems': 0};
			for(let i = 1; i <= this.experimentgroups[j-1]['configurations'].length; i++) {
				let key = document.getElementById(j + '_' + i +'_key')['value'];
				let value = document.getElementById(j + '_' + i + '_value')['value'];
				let conf = {'id':null, 'key':key, 'value':value};
				experimentgroup['configurations'].push(conf);
			}
			this.model.experimentgroups.push(experimentgroup);
		}

		this.experimentServerService.createExperiment(this.model);
		
	}

	

	active = true;
}