import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-native-validatiom',
  templateUrl: './form-native-validatiom.component.html',
  styleUrls: ['./form-native-validatiom.component.css']
})
export class FormNativeValidatiomComponent implements OnInit {


  firstName: string;
  lastName: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
