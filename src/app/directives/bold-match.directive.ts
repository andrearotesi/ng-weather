import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appBoldMatch]'
})
export class BoldMatchDirective implements OnChanges {

  @Input() textToMatch: string;

  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnChanges() {
    // Transforms the portion of the current text that matches with textToMatch to bold
    const regex = new RegExp(`(${this.textToMatch})`, 'gi');
    this.el.innerHTML = this.el.textContent.replace(regex, '<b>$1</b>');
  }

}
