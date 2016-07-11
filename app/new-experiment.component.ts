import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Experiment } from './experiment';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'new-experiment',
  templateUrl: 'app/new-experiment.component.html'
})
export class NewExperimentComponent {
	
	constructor(
    	private experimentServerService: ExperimentServerService) {
  	}

	model = new Experiment(null, '');
	submitted = false;
	experimentgroups = [];

	onSubmit() { 
		this.experimentgroups = [];
		let elements = document.getElementsByClassName("experimentgroup");
		for(let i = 0; i < elements.length; i++) {
			this.experimentgroups.push(elements[i]['value']);
		}
		this.submitted = true;

		 	
	}

	addExperimentgroup() {
		let input = document.createElement("input");
		input.type = "text";
		input.className = "experimentgroup";
		document.getElementById("experimentgroupDIV").appendChild(input);
	}

	active = true;
}