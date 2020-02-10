import { Component, OnInit, OnDestroy } from '@angular/core';

import { BoardService } from '../kanban/board.service';
import { Board, Product } from '../kanban/board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  products: Product[];
  productSub: Subscription;
  HEROES = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 5, name: 'BatGirl' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 3, name: 'Robin' },
    { id: 4, name: 'Flash' }
  ];
  panelOpenState = false;
  isPopVisible = false;
  whisMe = false;
  badgeNumber = 0;
  images: { "id": number; "url": string; }[];
  constructor(public boardService: BoardService) { }
  ngOnInit(): void {

    this.productSub = this.boardService.getUserProducts()
      .subscribe(products => {
        this.products = products
        // console.log(this.products);
      }
      );


    this.images = [
      { "id": 1, "url": "assets/img/header.jpeg" },
      { "id": 2, "url": "assets/img/velo2.jpeg" },
      { "id": 3, "url": "assets/img/velo3.jpeg" },
    ]

  }


  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  playAudio(butonName: string) {


    let audio = new Audio();
    switch (butonName) {
      case 'heart':
        audio.src = "assets/material_product_sounds/wav/03 Primary System Sounds/state-change_confirm-up.wav";
        this.isPopVisible = !this.isPopVisible;
        this.whisMe = !this.whisMe;
        break;

      case 'remove':
        audio.src = "assets/material_product_sounds/wav/01 Hero Sounds/hero_simple-celebration-03.wav";
        this.badgeNumber = this.badgeNumber - 1;
        break;

      case 'price':
        audio.src = "assets/material_product_sounds/wav/04 Secondary System Sounds/alert_error-02.wav";
        break;

      case 'pop':
        this.isPopVisible = !this.isPopVisible;
        break;

      case 'cigar':
        audio.src = "assets/material_product_sounds/wav/04 Secondary System Sounds/alert_error-02.wav";
        break;

      default:
        audio.src = "assets/material_product_sounds/wav/01 Hero Sounds/hero_simple-celebration-01.wav";
        this.badgeNumber = this.badgeNumber + 1;
        break;
    }

    audio.load();
    audio.play();
  }

}


