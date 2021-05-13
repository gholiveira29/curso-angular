import { Observable } from 'rxjs';
import { DvdService } from './../services/dvd.service';
import { Component, OnInit } from '@angular/core';
import { Dvd } from '../models/dvd';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  constructor(private dvdsService: DvdService) { }

  dvds$: Observable<Dvd[]>;

  ngOnInit(): void {
    this.dvds$ =this.dvdsService.dvds$;
  }

}
