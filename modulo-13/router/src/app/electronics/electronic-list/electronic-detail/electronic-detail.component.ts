import { EletronicService } from './../../../services/eletronic.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Eletronic } from 'src/app/models/eletronic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-electronic-detail',
  templateUrl: './electronic-detail.component.html',
  styleUrls: ['./electronic-detail.component.css']
})
export class ElectronicDetailComponent implements OnInit {

  electronic$: Observable<Eletronic>;

  constructor(
    private electronicService: EletronicService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let i: number = +this.route.snapshot.paramMap.get('index');
    this.electronic$ = this.electronicService.get(i);
  }

  back() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
