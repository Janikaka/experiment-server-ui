import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { ExperimentService } from './experiment.service';

@Component({
  selector: 'users',
  templateUrl: 'app/users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private router: Router,
    private experimentService: ExperimentService) { }

  getUsers(){
    this.experimentService.getUsers().then(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) { this.selectedUser = user; }

  gotoDetail() {
    this.router.navigate(['/users', this.selectedUser.id]);
  }

}