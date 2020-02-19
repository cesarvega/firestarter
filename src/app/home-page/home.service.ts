import { Injectable, Output, EventEmitter } from '@angular/core';
// import { Beehavio } from 'rxjs/BehaviorSubject';

// import { Customer, Order, Product } from '../entities/data';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Product, item, Order, OrderCalc } from './home.models';



@Injectable()
export class HomeService {


  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.getProducts();
  }

  items: Observable<Product[]>;
  private _products = new BehaviorSubject<Product[]>([]);
  private _shoppingCartItems = new BehaviorSubject<Product[]>([]);
  private _total = new BehaviorSubject<OrderCalc>({ orderTotal: 0, items: [], orderDate: new Date(), customerId: '' });

  private dataStore: { products: Product[] } = { products: [] }; // store our data in memory
  private dataStore2: { shoppingCartItems: Product[] } = { shoppingCartItems: [] }; // store our data in memory
  private totalStore: { totalOrder$: OrderCalc } = { totalOrder$: { orderTotal: 0, items: [], orderDate: new Date(), customerId: '', } }; // store our data in memory

  // observables to subscribe
  readonly products = this._products.asObservable();
  readonly shoppingCartItems = this._shoppingCartItems.asObservable();
  readonly totalOrder$ = this._total.asObservable();
  item: item;
  orderedItems: item[];
  orderCalculation: OrderCalc;
  @Output() valueChange = new EventEmitter();

  getProducts() {
    this.db.collection<Product>('products').valueChanges().subscribe(data => {
      this.dataStore.products = data;
      this.dataStore2.shoppingCartItems = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];;
      this.dataStore.products.forEach((product) => this.dataStore2.shoppingCartItems.forEach((shoppingCartItem => {
        if (shoppingCartItem)
          if (product.priority === shoppingCartItem.priority) {
            product.badgeNumber = shoppingCartItem.badgeNumber;
            product.like = shoppingCartItem.like;
            // calculate            
            this.totalStore.totalOrder$.orderTotal += shoppingCartItem.price * shoppingCartItem.badgeNumber;
            this.totalStore.totalOrder$.items.push(shoppingCartItem);
          }
      })))
      this.totalStore.totalOrder$.orderDate = new Date();
      this.totalStore.totalOrder$.customerId = 'LpVdaZbBcHZpgl5Uib6flNjQfJH3';
      this._total.next(Object.assign({}, this.totalStore).totalOrder$);
      this._products.next(Object.assign({}, this.dataStore).products);
      this.calculateTotal();
      // this.totalOrder$.subscribe(res => console.log('totalOrder$ : ' + res));

    },
      error => console.log('Could not load products.'));
  }


  setShoppingCartItemsAndLikes(product: Product): number {
    if (this.dataStore2.shoppingCartItems.includes(product)) {
      this.dataStore2.shoppingCartItems[this.dataStore2.shoppingCartItems.findIndex(x => x.priority == product.priority)].badgeNumber = product.badgeNumber;
      this.dataStore2.shoppingCartItems[this.dataStore2.shoppingCartItems.findIndex(x => x.priority == product.priority)].like = product.like;
    } else {
      this.dataStore2.shoppingCartItems.push(product);
    }

    this._shoppingCartItems.next(Object.assign({}, this.dataStore2).shoppingCartItems);
    localStorage.setItem('orders', JSON.stringify(this.dataStore2.shoppingCartItems));
    this.totalStore.totalOrder$.orderTotal = 0;
    this.calculateTotal();
    
    this.totalStore.totalOrder$.items = this.dataStore2.shoppingCartItems;
    this.totalStore.totalOrder$.orderDate = new Date();
    this.totalStore.totalOrder$.customerId = 'LpVdaZbBcHZpgl5Uib6flNjQfJH3';
    // this.totalOrder$.subscribe(r => {
    //   console.log('total as observable public var :' + r.orderTotal);
    // })


    this._total.next(Object.assign({}, this.totalStore).totalOrder$);
    this.totalStore.totalOrder$.orderTotal = this.totalStore.totalOrder$.orderTotal
    // this.valueChange.emit(this.totalStore.totalOrder$.orderTotal);

    return this.totalStore.totalOrder$.orderTotal;

  }

  calculateTotal(): number{
    this.dataStore2.shoppingCartItems.forEach((shoppingCartItem => {
    
        this.totalStore.totalOrder$.orderTotal += shoppingCartItem.price * shoppingCartItem.badgeNumber;
     
    }));

    return this.totalStore.totalOrder$.orderTotal;
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