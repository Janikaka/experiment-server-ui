import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './user';
import { ExperimentService } from './experiment.service';

@Component({
  selector: 'user-detail',
  templateUrl: 'app/user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  sub: any;

  constructor(
    private experimentService: ExperimentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.experimentService.getUser(id)
        .then(user => this.user = user);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }
}