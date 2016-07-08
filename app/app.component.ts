import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/experiments']" routerLinkActive="active">Experiments</a>
      <a [routerLink]="['/users']" routerLinkActive="active">Users</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
  ]
})
export class AppComponent {
}