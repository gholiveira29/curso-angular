import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  isDragginOver = false;
  @Output() dropppedfiles = new EventEmitter<FileList>();

  constructor() { }

  ngOnInit(): void {
  }

  onDragoverEvent(event: DragEvent) {
    event.preventDefault();
    this.isDragginOver = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragginOver = false
  }

  onDropEvent(event: DragEvent) {
    event.preventDefault();
    this.dropppedfiles.emit(event.dataTransfer.files);
  }

}
