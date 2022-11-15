import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    /*
      SEM HOSTBINDING

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
      )
      */
     this.backgroundColor = 'yellow'
  }
  @HostListener('mouseleave') onMouseLeave(){
    /*
      SEM HOSTBINDING

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'white'
      )*/

      this.backgroundColor = 'white'
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = ''

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
    ) { }

}
