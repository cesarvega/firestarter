import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  islogoWooble = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth) {}

  playCashRegister(){
    
    let audio = new Audio();
    audio.src = "assets/material_product_sounds/mrvr/Cash Register Sound Effect.mp3";
    audio.volume = 0.1;
    audio.load();
    audio.play();
  
  }
  
  ngOnInit(): void {
    setTimeout(() => {      
      this.islogoWooble = true;
    }, 1000);
    
  }
}
