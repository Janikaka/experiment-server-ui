export class Experiment {
	id: number;
	name: string;
	experimentgroups: Object[];

	constructor(id: number, name: string, experimentgroups: Object[]) {
		this.id = id;
		this.name = name;
		this.experimentgroups = experimentgroups;
	}
}