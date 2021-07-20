import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-load-files',
  templateUrl: './up-load-files.component.html',
  styleUrls: ['./up-load-files.component.css']
})
export class UpLoadFilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onDropFiles(files: FileList) {
    console.log(files)
  }

}
