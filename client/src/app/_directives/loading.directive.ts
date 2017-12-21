import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnInit {

  @Input('loading') text: string;

  private nativeElement : Node;
  
  constructor(
    private renderer : Renderer2,
    private element : ElementRef ) { }

  ngOnInit () {
    this.renderer.addClass(this.element.nativeElement, 'loader');

    let div = this.renderer.createElement('div');
    let text = this.renderer.createText(this.text || 'Loading...');

    this.renderer.addClass(div, 'loader-text');

    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.element.nativeElement, div);
  }
}
