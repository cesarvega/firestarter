import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from '../kanban/board.service';
import { Board } from '../kanban/board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  products: Board[];
  productSub: Subscription;
  const HEROES = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
];
  constructor(public boardService: BoardService) {}
  ngOnInit(): void {
    
    this.productSub = this.boardService.getUserProducts()
    .subscribe(products => 
     { this.products = products
      // console.log(this.products);
    }
      );

  }


  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }


}
