import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

interface IShopItemAvaliabilityMap {
  '#69f0ae': number[],
  yellow: number[],
  red: number[],
}

const shopItemAvaliabilityMap: IShopItemAvaliabilityMap = {
  '#69f0ae': [20, Infinity],
  yellow: [5, 19],
  red: [1, 4],
};

@Directive({
  selector: '[appShopItemAvaliabilityStyle]',
})
export class ShopItemAvaliabilityStyleDirective implements OnInit {
  @Input() avaliableNumber = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', (Object.keys(shopItemAvaliabilityMap).find(
      (key) => (Number(this.avaliableNumber) >= shopItemAvaliabilityMap[key as keyof IShopItemAvaliabilityMap][0]
        && Number(this.avaliableNumber) <= shopItemAvaliabilityMap[key as keyof IShopItemAvaliabilityMap][1]),
    )));
  }
}
