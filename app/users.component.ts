import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { ExperimentServerService } from './experiment-server.service';

@Component({
  selector: 'users',
  templateUrl: 'app/users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private router: Router,
    private experimentServerService: ExperimentServerService) { }

  getUsers(){
    this.experimentServerService.getUsers().then(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) { this.selectedUser = user; }

  showUserDetails() {
    this.router.navigate(['/users/', this.selectedUser.id]);
  }

}