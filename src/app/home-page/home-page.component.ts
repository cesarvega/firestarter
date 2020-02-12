import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../kanban/board.service';
import { Board, Product } from '../kanban/board.model';
import { Subscription } from 'rxjs';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  products: Product[];
  productSub: Subscription;
  playMusicOnce = false;
  animations = [
    { animationName: "bounce" },
    { animationName: "flash" },
    { animationName: "pulse" },
    { animationName: "rubberBand" },
    { animationName: "shake" },
    { animationName: "swing" },
    { animationName: "tada" },
    { animationName: "wobble" },
    { animationName: "jello" },
    { animationName: "heartBeat" },
    { animationName: "bounceIn" },
    { animationName: "bounceInDown" },
    { animationName: "bounceInLeft" },
    { animationName: "bounceInRight" },
    { animationName: "bounceInUp" },
    { animationName: "bounceOut" },
    { animationName: "bounceOutDown" },
    { animationName: "bounceOutLeft" },
    { animationName: "bounceOutRight" },
    { animationName: "bounceOutUp" },
    { animationName: "fadeIn" },
    { animationName: "fadeInDown" },
    { animationName: "fadeInDownBig" },
    { animationName: "fadeInLeft" },
    { animationName: "fadeInLeftBig" },
    { animationName: "fadeInRight" },
    { animationName: "fadeInRightBig" },
    { animationName: "fadeInUp" },
    { animationName: "fadeInUpBig" },
    { animationName: "fadeOut" },
    { animationName: "fadeOutDown" },
    { animationName: "fadeOutDownBig" },
    { animationName: "fadeOutLeft" },
    { animationName: "fadeOutLeftBig" },
    { animationName: "fadeOutRight" },
    { animationName: "fadeOutRightBig" },
    { animationName: "fadeOutUp" },
    { animationName: "fadeOutUpBig" },
    { animationName: "flip" },
    { animationName: "flipInX" },
    { animationName: "flipInY" },
    { animationName: "flipOutX" },
    { animationName: "flipOutY" },
    { animationName: "lightSpeedIn" },
    { animationName: "lightSpeedOut" },
    { animationName: "rotateIn" },
    { animationName: "rotateInDownLeft" },
    { animationName: "rotateInDownRight" },
    { animationName: "rotateInUpLeft" },
    { animationName: "rotateInUpRight" },
    { animationName: "rotateOut" },
    { animationName: "rotateOutDownLeft" },
    { animationName: "rotateOutDownRight" },
    { animationName: "rotateOutUpLeft" },
    { animationName: "rotateOutUpRight" },
    { animationName: "slideInUp" },
    { animationName: "slideInDown" },
    { animationName: "slideInLeft" },
    { animationName: "slideInRight" },
    { animationName: "slideOutUp" },
    { animationName: "slideOutDown" },
    { animationName: "slideOutLeft" },
    { animationName: "slideOutRight" },
    { animationName: "zoomIn" },
    { animationName: "zoomInDown" },
    { animationName: "zoomInLeft" },
    { animationName: "zoomInRight" },
    { animationName: "zoomInUp" },
    { animationName: "zoomOut" },
    { animationName: "zoomOutDown" },
    { animationName: "zoomOutLeft" },
    { animationName: "zoomOutRight" },
    { animationName: "zoomOutUp" },
    { animationName: "hinge" },
    { animationName: "jackInTheBox" },
    { animationName: "rollIn" },
    { animationName: "rollOut" },
  ];
  islogoWooble = false;
  panelOpenState = false;
  isPopVisible = false;
  whisMe = false;
  whisMeFilled = false;
  badgeNumber = 0;
  images: { "id": number; "url": string; }[];

  animal: string;
  name: string;
  constructor(public boardService: BoardService, public dialog: MatDialog, private scrollDispatcher: ScrollDispatcher) { }
  ngOnInit(): void {


    this.scrollDispatcher.scrolled().subscribe(x => {
      console.log('I am scrolling')
    });

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


  playAmbientMusic() {
    if (this.playMusicOnce) {
      setTimeout(() => {
        let audio = new Audio();
        audio.src = "assets/material_product_sounds/mrvr/ambiemceVrMusic_v01.wav";
        audio.load();
        audio.play();
        this.playMusicOnce = false;
      }, 1000);
     
    
    }


  }


  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  playAudio(butonName: string) {


    let audio = new Audio();
    switch (butonName) {

      case 'heart':
        // audio.src = "assets/material_product_sounds/wav/03 Primary System Sounds/state-change_confirm-up.wav";
        audio.src = "assets/material_product_sounds/mrvr/pufff.wav";
        this.whisMe = !this.whisMe;
        this.isPopVisible = !this.isPopVisible;

        setTimeout(() => {
          this.isPopVisible = !this.isPopVisible;
          this.whisMeFilled = !this.whisMeFilled;
          setTimeout(() => {

          }, 1000);
        }, 900);

        audio.load();
        audio.play();
        break;

      case 'song':
        audio.src = "assets/material_product_sounds/mrvr/pufff.wav";
        audio.load();
        audio.play();
        break;

      case 'remove':
        audio.src = "assets/material_product_sounds/wav/01 Hero Sounds/hero_simple-celebration-03.wav";
        this.badgeNumber = this.badgeNumber - 1;
        audio.load();
        audio.play();
        break;

      case 'price':
        audio.src = "assets/material_product_sounds/wav/04 Secondary System Sounds/alert_error-02.wav";
        audio.load();
        audio.play();
        break;

      case 'cigar':
        audio.src = "assets/material_product_sounds/wav/04 Secondary System Sounds/alert_error-02.wav";
        audio.load();
        audio.play();
        break;  

      default:
        audio.src = "assets/material_product_sounds/wav/01 Hero Sounds/hero_simple-celebration-01.wav";
        this.badgeNumber = this.badgeNumber + 1;
        audio.load();
        audio.play();
        break;
    }


  }



  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // width: '250px',
      data: {name: product.name, animal: product.smallDescription}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

  

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./home-page.component.scss']
})
export class DialogOverviewExampleDialog {
  name: any;
  animal: any;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
