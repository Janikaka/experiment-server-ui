import { Experimentgroup } from './experimentgroup';

export class Experiment {
	id: number;
	name: string;
	experimentgroups: Experimentgroup[];
	totalDataitems: number;
	startDatetime: any; //Fix this
	endDatetime: any;

	constructor(id: number, name: string, experimentgroups: Experimentgroup[], totalDataitems: number, startDatetime: any, endDatetime: any) {
		this.id = id;
		this.name = name;
		this.experimentgroups = experimentgroups;
		this.totalDataitems = totalDataitems;
		this.startDatetime = startDatetime;
		this.endDatetime = endDatetime;
	}

}