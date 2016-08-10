export class Configuration {
	id: number;
	key: string;
	value: any;

	constructor(id: number, key: string, value: any) {
		this.id = id;
		this.key = key;
		this.value = value;
	}
}