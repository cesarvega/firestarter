import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomeService } from 'src/app/home-page/home.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  providers:[HomeService]
})
export class ShellComponent implements OnInit {
  islogoWooble = false;
  totalOrderPrice = 0;
  orderTotal: Observable<any>;
  orderTotalNumber = 0;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth,
              public _totalOrder: HomeService) {
                 this.orderTotal = _totalOrder.totalOrder$;    

    }

  playCashRegister(total){
    // this.orderTotal.subscribe(r=>{
    //   console.log('from shell: ' + r.orderTotal);
      
    // })
    console.log('from shell: ' + total)
    let audio = new Audio();
    audio.src = "assets/material_product_sounds/mrvr/Cash Register Sound Effect.mp3";
    audio.volume = 0.1;
    audio.load();
    audio.play();
  
  }
  
  ngOnInit(): void {

    this.orderTotal.subscribe(r=>{
      console.log('from shell: ' + r.orderTotal);
      
    })




    setTimeout(() => {      
      this.islogoWooble = true;
    }, 1000);   
  }
}
