import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hotelHover]'
})
export class HoverDirective implements OnInit {

  @Input() hotelHover: string ='yellow';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
   }

    ngOnInit(): void {
      this.renderer.setStyle(
        this.element.nativeElement,'backgroundColor', 'aqua'
      );
    }

    @HostListener('mouseenter') onMouseEnter(){
      this.renderer.setStyle(
        this.element.nativeElement,'backgroundColor', 'purple'
      );
      }
    @HostListener('mouseleave') onmouseleave(){
        this.renderer.setStyle(
          this.element.nativeElement, 'backgroundColor', 'orange'
        );
    }

}
