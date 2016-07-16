export class User {
	id: number;
	username: string;
	totalDataitems: number;

	constructor(id: number, username: string, totalDataitems: number) {
		this.id = id;
		this.username = username;
		this.totalDataitems = totalDataitems;
	}
}