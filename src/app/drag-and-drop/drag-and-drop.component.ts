import { takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect') myrect: ElementRef;

  top: number = 40;
  left: number = 40;

  constructor() { }

  ngOnInit()  {
  }

  ngAfterViewInit(): void {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((e: MouseEvent) => {
      let x = e.screenX;
      let y = e.screenY;
      
      mousemove
      .pipe(
        takeUntil(mouseup)
      )
      .subscribe((em: MouseEvent) => {
        let offsetx = x - em.screenX;
        let offsety = y - em.screenY;
        this.top -= offsety;
        this.left -= offsetx;
        x = em.screenX;
        y = em.screenY;
      });
    });
    
  }

}
