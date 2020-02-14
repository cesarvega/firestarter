import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-app-gallery',
  templateUrl: './app-gallery.component.html',
  styleUrls: ['./app-gallery.component.scss']
})
export class AppGalleryComponent implements OnInit {

  scrollFromTop: number;
  images: any = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg'
  ];

  imagesBig: any = [
    'assets/images/slide-big1.jpg',
    'assets/images/slide-big2.jpg',
    'assets/images/slide-big3.jpg'
  ];

  owlOption: any = {
    loop: true,
    items:1,
    dots: true,
    autoplay: 10000,
    autoplayTimeout: 15000,
    autoplayHoverPause: true,
    navigation: false,
    responsiveClass:true,
  };

  constructor() { }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    let x  = window.scrollX;
    this.scrollFromTop  = window.scrollY;
    console.log(x + ':' + this.scrollFromTop);
    
  }
  ngOnInit() {
  }

}
