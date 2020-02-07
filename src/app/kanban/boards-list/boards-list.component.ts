import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {

  boards: Board[];
  sub: Subscription;
  products: Board[];
  productSub: Subscription;

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe(boards => (this.boards = boards));
      console.log(this.boards);

      this.productSub = this.boardService.getUserProducts()
      .subscribe(products => 
       { this.products = products
        console.log(this.products);
      }
        );

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length
        });

        // create product
        this.boardService.createProduct({          
          name : 'product name',
          active : true,
          description : 'string',
          cigarOrigin : 'string',
          strength : 'string',
          wrapperColor : 'string',
          wrapper : 'string',
          binder : 'string',
          filler : 'string',
          rolledBy : 'string',
          manufacturer : 'string',
          sku : 'string',
          quantitysku : 10,
          shippingFee : 10,
          extraShippingFee : 10,
          price : 10,
          boxOf : 10,
          boxOfPrice : 10,
          comparedPrice : 10,
          taxRate : 10,
          priceTaxExcl : 10,
          priceTaxIncl : 10,
          itemsInstock : 10,
          priority : this.products.length,
          smokeRings : 10,
          photos : [ {description: 'one', url: 'assets/images/ecommerce/braies-lake.jpg'},
                     {description: 'two', url: 'assets/images/ecommerce/fall-glow.jpg'}],
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
