export class Configuration {
	id: number;
	key: string;
	value: number;

	constructor(id: number, key: string, value: number) {
		this.id = id;
		this.key = key;
		this.value = value;
	}
}