import { Injectable } from '@angular/core';
// import { Beehavio } from 'rxjs/BehaviorSubject';

// import { Customer, Order, Product } from '../entities/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Product } from './home.models';



@Injectable()
export class HomeService {
  
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.getShoppingCartItems();
    this.getProducts();
    this.getLikes();
  }

  items: Observable<Product[]>;
  private _products = new BehaviorSubject<Product[]>([]);
  private _shoppingCartItems = new BehaviorSubject<Product[]>([]);
  private _likeItems = new BehaviorSubject<Product[]>([]);
  private dataStore: { products: Product[] } = { products: [] }; // store our data in memory
  private dataStore2: { shoppingCartItems: Product[] } = { shoppingCartItems: [] }; // store our data in memory
  private dataStore3: { likeItems: Product[] } = { likeItems: [] }; // store our data in memory
  readonly products = this._products.asObservable();
  readonly shoppingCartItems = this._shoppingCartItems.asObservable();
  readonly likeItems = this._likeItems.asObservable();
  orders : Product[] = [];
  likes : Product[] = [];

  setShoppingCartItems(product: Product) {
    this.orders.push(product);
    this.dataStore2.shoppingCartItems = this.orders;
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  removeShoppingCartItems(index: number) {
    this.dataStore2.shoppingCartItems.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(this.dataStore2.shoppingCartItems.splice(index, 1)));
  }

  getShoppingCartItems() {
    this.dataStore2.shoppingCartItems = (JSON.parse(localStorage.getItem('orders')))?JSON.parse(localStorage.getItem('orders')): [];
    this.setBadgeandLikes(this.dataStore2.shoppingCartItems);
    this._shoppingCartItems.next(Object.assign({}, this.dataStore2).shoppingCartItems);
  }

  getLikes() {
    this.dataStore.products.forEach((product)=> this.dataStore3.likeItems.forEach((likeItems=>{
      if ( product.priority === likeItems.priority) {        
        product.like = likeItems.like;
      }
    })))
  }

  SetLikes(product: Product) {
    this.likes.push(product);
    this.dataStore3.likeItems = this.likes;
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  getProducts() {
    this.db.collection<Product>('products').valueChanges().subscribe(data => {
      this.dataStore.products = data;
      this.dataStore.products.forEach((product)=> this.dataStore2.shoppingCartItems.forEach((shoppintCartItem=>{
        if ( product.priority === shoppintCartItem.priority) {
          product.badgeNumber = shoppintCartItem.badgeNumber;       
        }
      })))
      
      this._products.next(Object.assign({}, this.dataStore).products);
    },
      error => console.log('Could not load products.'));
  }


  setBadgeandLikes(shoppingCartItems) {
    const xxx = shoppingCartItems.map( item => {
      this.dataStore.products.map(product => {item.uid === product.uid} )
    });

    console.log(xxx);
    
  }



  //Creates a new proucts for the current user
  async createProduct(data: Product) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('products').add({
      ...data,
      uid: user.uid
    });
  }

  getUserProducts() {
    this.db.collection<Product>('products', ref =>
      ref.where('uid', '==', 'LpVdaZbBcHZpgl5Uib6flNjQfJH3').orderBy('priority')
    )
      .valueChanges({ idField: 'id' })
  }



  // getUserProducts() {
  //   return this.afAuth.authState.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         return this.db
  //           .collection<Product>('products', ref =>
  //             ref.where('uid', '==', user.uid).orderBy('priority')
  //           )
  //           .valueChanges({ idField: 'id' });
  //       } else {
  //         return [];
  //       }
  //     }),
  //     // map(boards => boards.sort((a, b) => a.priority - b.priority))
  //   );
  // }


  updateProducts(product: Product) {
    return this.db
      .collection('products')
      .doc(product.uid)
      .update({ product });
  }

  deleteProduct(productId: string) {
    return this.db
      .collection('products')
      .doc(productId)
      .delete();
  }


}