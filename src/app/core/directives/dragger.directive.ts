import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  Input,
  AfterViewInit
} from '@angular/core';


const mapbutton = new Map([['any', -1], ['left', 0], ['middle', 1], ['right', 2]]);

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[app-dragger]'
})
export class DraggerDirective implements AfterViewInit {

  protected hasEvents = false;
  protected mouseover: (evt: MouseEvent) => any = (evt => this.mouseOver(evt));
  protected mousemove: (evt: MouseEvent) => any = (evt => this.mouseMove(evt));
  protected mousedown: (evt: MouseEvent) => any = (evt => this.mouseDown(evt));
  protected mouseup: (evt: MouseEvent) => any = (evt => this.mouseUp(evt));
  protected $enable = true;
  isMouseDown = false;
  isMouseOver = false;

  @Input() strict = false;
  @Input() offset = 16;
  @Input() mousebutton: 'any' | 'left' | 'middle' | 'right' = 'any';
  @Output() start = new EventEmitter<MouseEvent>();
  @Output() moving = new EventEmitter<{ x: number, y: number, event?: MouseEvent }>();
  @Output() end = new EventEmitter<MouseEvent>();

  @Input('drag-enable') set enable(v) {
    this.$enable = v;
    if (!v && this.hasEvents) {
      this.removeEvents();
    }
    if (v) {
      this.addEvents();
    }
  }

  get enable() {
    return this.$enable;
  }

  constructor(protected element: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    if (this.enable) {
      this.addEvents();
    }
  }

  protected addEvents() {
    if (this.hasEvents) {
      return;
    }
    this.element.nativeElement.addEventListener('mousedown', this.mousedown);
    this.element.nativeElement.addEventListener('mouseover', this.mouseover);
    this.element.nativeElement.addEventListener('mouseout', this.mouseover);
    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('mouseup', this.mouseup);

    this.hasEvents = true;
  }

  protected removeEvents() {
    this.element.nativeElement.removeEventListener('mousedown', this.mousedown);
    this.element.nativeElement.removeEventListener('mouseover', this.mouseover);
    this.element.nativeElement.removeEventListener('mouseout', this.mouseover);
    window.removeEventListener('mouseup', this.mouseup);
    window.removeEventListener('mousemove', this.mousemove);
    this.hasEvents = false;
  }

  // @HostListener("mousedown", ['$event'])
  mouseDown(event: MouseEvent) {
    if (this.mousebutton === 'any' || mapbutton.get(this.mousebutton) === event.button) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.isMouseDown = true;
      this.start.emit(event);
    }
  }

  // @HostListener("window:mousemove", ['$event'])
  mouseMove(event: MouseEvent) {

    if (this.isMouseDown && (!this.strict || this.strict && this.isMouseOver)) {
      event.preventDefault();
      this.moving.emit({
        x: event.movementX,
        y: event.movementY,
        event
      });
    }

  }

  // @HostListener("window:mouseup", ['$event'])
  mouseUp(event: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }
    // event.preventDefault();
    this.isMouseDown = false;
    this.end.emit(event);
  }

  mouseOver(evnt: MouseEvent) {
    this.isMouseOver = evnt.type === 'mouseover';
  }


}
