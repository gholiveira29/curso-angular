import { Observable } from 'rxjs';
import { DvdService } from './../services/dvd.service';
import { Component, OnInit } from '@angular/core';
import { Dvd } from '../models/dvd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  constructor(
    private dvdsService: DvdService,
    private router: Router
    ) { }

  dvds$: Observable<Dvd[]>;

  ngOnInit(): void {
    this.dvds$ = this.dvdsService.dvds$;
  }


  goDetails(i: number, dvd: Dvd) {
    this.router.navigate([`dvds/${i}`, {title: dvd.title}]);
  }

  remove(i: number) {
    this.dvdsService.remove(i);
  }

}
