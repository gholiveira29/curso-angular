import { FileEntry } from './../models/fileentry.model';
import { FilesService } from './../files.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-load-files',
  templateUrl: './up-load-files.component.html',
  styleUrls: ['./up-load-files.component.css']
})
export class UpLoadFilesComponent implements OnInit {

  files: FileEntry[] = [];

  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  }

  onDropFiles(files: FileList) {
    this.files.splice(0, this.files.length);

    for (let i = 0; i < files.length; i++) {
      this.files.push({
        file: files.item(i),
        percentage: null,
        bytesuploaded: null,
        canceled: null,
        error: null,
        finished: null,
        paused: null,
        state: null,
        task: null,
        uploading: null
      });
    }
  }

  removeFileFromList(i) {
    this.files.splice(i,1);
  }

  uploadAll() {
    for(let i = 0; i < this.files.length; i++) {
      this.filesService.upload(this.files[i]);
    }
  }


}
