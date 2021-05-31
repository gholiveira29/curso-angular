import { Observable } from 'rxjs';
import { DvdService } from './../../services/dvd.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Dvd } from 'src/app/models/dvd';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.css']
})
export class DvdDetailComponent implements OnInit {

  dvd$: Observable<Dvd>;
  title = null;

  constructor(
    private route: ActivatedRoute,
    private dvdService: DvdService,
    private router: Router
    ) { }

  ngOnInit(): void {
  let index = this.route.snapshot.paramMap.get('index');
    this.dvd$ = this.dvdService.get(index);
    this.route.paramMap.subscribe((parans: ParamMap) => {
      if(parans.has('title')) {
        this.title = parans.get('title');
        console.log(this.title)
        
      }
    })
    console.log(index)
  }


  goBack() {
    this.router.navigateByUrl('/dvds')
  }
}
