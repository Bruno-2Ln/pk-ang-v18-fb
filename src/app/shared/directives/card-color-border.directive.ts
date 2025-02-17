import {Directive, ElementRef, HostListener, input} from '@angular/core';
import {getPokemonColor} from "../../features/pokemon/pokemon.model";

@Directive({
  selector: '[appCardColorBorder]',
  standalone: true
})
export class CardColorBorderDirective {
  type = input.required<string>()
  private readonly initialColor: string;

  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') OnMouseEnter() {
    const color = getPokemonColor(this.type());
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initialColor;
    this.setBorder(color);
  }

  private setBorder = (color: string): void => {
    this.el.nativeElement.style.borderColor = color;
  }

}
