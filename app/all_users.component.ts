import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	selector:'all_users',
	templateUrl: 'app/all_users.component.html'
	
})

export class AllUsers { 
	
	users = [{username: 'First user'}, {username:'Second user'}];
}