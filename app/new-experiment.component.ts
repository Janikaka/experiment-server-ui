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
	valueTypes = ['Integer', 'Double', 'Boolean', 'String'];
	constructor(
    	private experimentServerService: ExperimentServerService) {
  	}
	model = new Experiment(null, '', [], null, null, null, null, null);
	submitted = false;
	
	experimentgroups = [];
	addExperimentgroup() {
		this.experimentgroups.push({'id': this.experimentgroups.length+1, 'name':'', 'configurations':[]});
	}
	addConf(id) {
		this.experimentgroups[id-1]['configurations'].push({'id':this.experimentgroups[id-1]['configurations'].length+1, 'key':'', 'value': null});
	}
	setConfValueType(expgroupId, confId, type) {
		console.log("setConfValueType: " + type);
		this.experimentgroups[expgroupId-1]['configurations'][confId-1]['type'] = type;
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
				let type = document.getElementById(j + '_' + i + '_select')['value'];
				console.log("key: " + key + ", value: " + value + ", type: " + type);
				if(type == 'Integer') {
					value = parseInt(value);
				} else if(type == 'Double') {
					value = parseFloat(value); //Problem: 5.0 === 5
				} else if(type == 'Boolean') {
					value = Boolean(value);
				}
				console.log("typeof value: " + typeof(value));
				let conf = {'id':null, 'key':key, 'value':value};
				experimentgroup['configurations'].push(conf);
			}
			this.model.experimentgroups.push(experimentgroup);
		}

		this.experimentServerService.createExperiment(this.model);
		
	}

	

	active = true;
}