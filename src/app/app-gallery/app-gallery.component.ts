import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-gallery',
  templateUrl: './app-gallery.component.html',
  styleUrls: ['./app-gallery.component.scss']
})
export class AppGalleryComponent implements OnInit {

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
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    navigation: false,
    responsiveClass:true,
  };

  constructor() { }

  ngOnInit() {
  }

}
