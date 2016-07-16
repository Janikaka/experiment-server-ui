import { Configuration } from './configuration';

export class Experimentgroup {
	id: number;
	name: string;
	configurations: Configuration[];
	totalDataitems: number;

	constructor(id: number, name: string, configurations: Configuration[], totalDataitems: number) {
		this.id = id;
		this.name = name;
		this.configurations = configurations;
		this.totalDataitems = totalDataitems;
	}
}