import { Experimentgroup } from './experimentgroup';

export class Experiment {
	id: number;
	name: string;
	experimentgroups: Experimentgroup[];
	totalDataitems: number;

	constructor(id: number, name: string, experimentgroups: Experimentgroup[], totalDataitems: number) {
		this.id = id;
		this.name = name;
		this.experimentgroups = experimentgroups;
		this.totalDataitems = totalDataitems;
	}

}