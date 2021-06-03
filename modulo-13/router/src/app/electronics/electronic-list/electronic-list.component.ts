import { Observable } from 'rxjs';
import { EletronicService } from './../../services/eletronic.service';
import { Component, OnInit } from '@angular/core';
import { Eletronic } from 'src/app/models/eletronic';

@Component({
  selector: 'app-electronic-list',
  templateUrl: './electronic-list.component.html',
  styleUrls: ['./electronic-list.component.css']
})
export class ElectronicListComponent implements OnInit {

  electronics$: Observable<Eletronic[]>;

  constructor(private electronicService: EletronicService) { }

  ngOnInit(): void {
    this.electronics$ = this.electronicService.electronic$;
  }

}
