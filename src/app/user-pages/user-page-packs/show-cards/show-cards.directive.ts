import { ViewChild } from '@angular/core';
import { Directive, Renderer2, ElementRef, OnInit, HostListener, Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserPagePacksComponent } from '../user-page-packs.component';



@Directive({
  selector: '[appShowCards]'
})


export class ShowCardsDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @Input() lastBought = '';
  
  @HostListener('click') onClick() {
    //this.el.nativeElement.style.display = 'none';
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello world!');
    const children = this.el.nativeElement.children;
    this.renderer.appendChild(div, text);
    for (let i = 0; i < children.length; i++)
    {
      this.renderer.removeChild(this.el.nativeElement, children[i]);
    }
    
    //this.el.nativeElement.style.display = 'flex'
    
  }

  ngOnInit(): void {
  }

}
