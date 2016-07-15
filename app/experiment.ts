import { Experimentgroup } from './experimentgroup';

export class Experiment {
	id: number;
	name: string;
	experimentgroups: Experimentgroup[];

	constructor(id: number, name: string, experimentgroups: Experimentgroup[]) {
		this.id = id;
		this.name = name;
		this.experimentgroups = experimentgroups;
	}
}