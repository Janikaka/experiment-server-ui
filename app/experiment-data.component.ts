import { Component, OnInit, OnDestroy} from '@angular/core';
import { ExperimentServerService } from './experiment-server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: 'app/experiment-data.component.html'
})
export class ExperimentDataComponent implements OnInit, OnDestroy { 
	sub: any;
	data: any;

	constructor(
		private experimentServerService: ExperimentServerService,
		private router: Router,
		private route: ActivatedRoute
	){}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
      		let id = +params['id'];
      		this.router.navigate(['/experiments/' + id + '/data']);
    	});
	}

	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}


}