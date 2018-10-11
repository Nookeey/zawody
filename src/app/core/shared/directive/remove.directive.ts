import { Directive, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appRemove]'
})
export class RemoveDirective {

  @ViewChild('vcRspan') vcRspan;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  mouseenter(eventDate: Event) {
    const part = this.el.nativeElement.querySelector('.remove');
    this.renderer.setStyle(part, 'visibility', 'visible');
  }

  @HostListener('mouseleave')
  mouseleave(eventDate: Event) {
    const part = this.el.nativeElement.querySelector('.remove');
    this.renderer.setStyle(part, 'visibility', 'hidden');
  }

}
