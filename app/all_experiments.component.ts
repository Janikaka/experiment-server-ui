import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Experiment } from './experiment';
import { Router } from '@angular/router';

@Component({
	selector:'all_experiments',
	templateUrl: 'app/all_experiments.component.html'
})

export class AllExperiments { 

	constructor(
		private router: Router){

	}

	experiments = [{name: 'First experiment', id: 1}, {name: 'Second experiment', id:2}];
	onSelect(experiment: Experiment) {
		let link = ['/experiments', experiment.id];
    	this.router.navigate(link);
	}
}