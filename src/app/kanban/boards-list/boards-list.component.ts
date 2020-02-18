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

          
        const as =  ['1','2','3','4',5];
        // as.forEach(element => {
          this.boardService.createProduct(
          
            {  
            name : 'Arturo Fuente',
            active : true,
            description : `Epic Cigars is proud to offer the Smoking Shields: a special limited release produced in honor 
            of the non-profit organization of the same name, which raises money for law enforcement men and women and their families.
            This medium to full-bodied Nicaraguan cigar consists of a dark and oily Brazilian maduro wrapper, Dominican binder,
            and filler from both Nicaragua and Dominican Republic that comes together to provide delicious rich notes of espresso,
            cocoa and leather. A portion of every sale goes towards supporting this worthy cause built around honoring those who keep us safe`,
            smallDescription : 'Toro, Full, Maduro, Dominican Republic',
            cigarOrigin : 'string',
            cigarShape : 'Torpedo',
            brands: 'american stoogies',
            badgeNumber : 0,
            like : false,
            strength : 'medium',
            wrapperColor : 'string',
            wrapper : 'natural',
            binder : 'nicaragua',
            filler : 'hoduras',
            rolledBy : 'Handmade',
            manufacturer : 'Absolute Cigars',
            sku : 'xfsgeukdl',
            quantitysku : 12,
            shippingFee : 5,
            extraShippingFee : 3,
            price : 10.33,
            boxOf : 25,
            boxOfPrice : 10.04,
            comparedPrice : 14.34,
            taxRate : 7,
            priceTaxExcl : 10,
            priceTaxIncl : 10,
            itemsInstock : 10,
            priority : Date.now(),
            smokeRings : 10,
            photos : [ {description: 'one', url: 'assets/images/cigars/601_{{i%4}}.png'},
                       {description: 'two', url: 'assets/images/cigars/601_{{i%4}}.png'}],
          });
        //  });


     
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
