import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  depEdit: Department = null;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.departmentService.get()
    .subscribe((res) => {
      this.departments = res;
    })
  }



  save() {
    if(this.depEdit) {
      this.departmentService.update({name: this.depName, _id: this.depEdit._id})
      .subscribe((dep) => {
        this.notiFy('Updated');
        this.clearFields();
      },
      (err) =>  {
        this.notiFy('Error');
      }
      )
    } else {
    this.departmentService.add({name: this.depName})
    .subscribe(() => {      
      this.clearFields();
      this.notiFy('inserted')
    }, 
    (err) => this.notiFy(err))
    }
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }
  cancel() {
    this.clearFields();
  }

  delet(dep) {
    this.departmentService.delete(dep)
    .subscribe(() => {
      this.notiFy('Deleted')
    },
    (err) => {
      this.notiFy(err.error.msg);
    }
    )
  }

  edit(dep: Department) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  notiFy(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 5000});
  }

}
