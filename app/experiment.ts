class Configuration {
	id: number;
	key: string;
	value: number;
}

class Experimentgroup {
	id: number;
	name: string;
	configurations: Configuration[]
}

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