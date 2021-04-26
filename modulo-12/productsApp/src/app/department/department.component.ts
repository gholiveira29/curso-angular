import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentService.get()
    .subscribe((res) => {
      this.departments = res;
    })
  }



  save() {
    this.departmentService.add({name: this.depName})
    .subscribe((res) => {      
      this.clearFields();
    }, 
    (err) => console.error(err))
  }

  clearFields() {
    this.depName = '';
  }
  cancel() {

  }

  delet(dep) {
    
  }

  edit(dep) {

  }

}
