import { Person } from './../person';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  people$: Observable<Person[]> = new Observable<Person[]>();

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
    this.mainService.addPerson(p);
  }

  generete() {
    for(let i = 0 ; i < 5 ; i++) {
      this.addPerson();
    }
  }

}
