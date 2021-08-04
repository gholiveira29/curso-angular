import { Person } from './../person.model';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$:  Observable<Person[]> = new Observable<Person[]>();

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople();
  }

  addPerson() {
    const p: Person = {
      name: faker.name.findName(),
      age: faker.random.number({min: 18, max: 99}),
      email: faker.internet.email(),
      company: faker.company.companyName(),
      country: faker.address.country()
    };
  }

  generete() {
    for(let i = 0 ; i < 5 ; i++) {
      this.addPerson();
    }
  }

}
