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

	model = new Experiment(null, '', []);
	submitted = false;
	experimentgroups = [];


	onSubmit() { 
		
		this.submitted = true;
		let expGroupElements = document.getElementsByClassName("experimentgroup");
		let confKeyElements = document.getElementsByClassName("confKey");
		let confValueElements = document.getElementsByClassName("confValue");


		this.experimentgroups = [];
		this.model.experimentgroups = [];

		for(let i = 0; i < expGroupElements.length; i++) {
			let expgroup = expGroupElements[i]['value'];
			let confKey = confKeyElements[i]['value'];
			let confValue = confValueElements[i]['value'];
			this.experimentgroups.push({'name': expgroup, 'configurations': [{'key':confKey, 'value':confValue}]});
			this.model.experimentgroups.push({'id':100, 'name': expgroup, 'configurations': [{'id':1001,'key':confKey, 'value':confValue}]});
		}
		
		this.experimentServerService.createExperiment(this.model);
		
	}

	addExperimentgroup() {
		let div = document.createElement("div");
		let name = document.createTextNode("Name: ");
		div.appendChild(name);
		let nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.placeholder = "Enter experiment group";
		nameInput.className = "experimentgroup";
		div.appendChild(nameInput);
		let br = document.createElement("br");
		div.appendChild(br);
		div.appendChild(br);

		let keyDiv = document.createElement("div");
		let key = document.createTextNode("Conf key: ");
		keyDiv.appendChild(key);
		let confKeyInput = document.createElement("input");
		confKeyInput.type = "text";
		confKeyInput.placeholder = "Enter conf key";
		confKeyInput.className = "confKey";
		keyDiv.appendChild(confKeyInput);
		keyDiv.appendChild(br);
		keyDiv.appendChild(br);

		let valueDiv = document.createElement("div");
		let value = document.createTextNode("Conf value: ");
		valueDiv.appendChild(value);
		let confValueInput = document.createElement("input");
		confValueInput.type = "text";
		confValueInput.placeholder = "Enter conf value";
		confValueInput.className = "confValue";
		valueDiv.appendChild(confValueInput);
		valueDiv.appendChild(br);

		document.getElementById("experimentgroupDIV").appendChild(div);
		document.getElementById("experimentgroupDIV").appendChild(keyDiv);
		document.getElementById("experimentgroupDIV").appendChild(valueDiv);

		let emptyDiv = document.createElement("div");
		emptyDiv.appendChild(document.createElement("p"));
		document.getElementById("experimentgroupDIV").appendChild(emptyDiv);
	}

	active = true;
}