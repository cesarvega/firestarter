import { Injectable } from '@angular/core';
// import { Beehavio } from 'rxjs/BehaviorSubject';

// import { Customer, Order, Product } from '../entities/data';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private _total = new BehaviorSubject<number>(0);

  private dataStore: { products: Product[] } = { products: [] }; // store our data in memory
  private dataStore2: { shoppingCartItems: Product[] } = { shoppingCartItems: [] }; // store our data in memory
  private totalStore: { totalPrice: number } = { totalPrice: 0 }; // store our data in memory

  // observables to subscribe
  readonly products = this._products.asObservable();
  readonly shoppingCartItems = this._shoppingCartItems.asObservable();
  readonly totalPrice = this._total.asObservable();
  item: item;
  orderedItems: item[];
  orderCalculation: OrderCalc;

  getProducts() {
    this.totalStore.totalPrice = 0;
    this.db.collection<Product>('products').valueChanges().subscribe(data => {
      this.dataStore.products = data;
      this.dataStore2.shoppingCartItems = JSON.parse(localStorage.getItem('orders'));
      this.dataStore.products.forEach((product) => this.dataStore2.shoppingCartItems.forEach((shoppingCartItem => {
        if (shoppingCartItem) 
          if (product.priority === shoppingCartItem.priority) {
            product.badgeNumber = shoppingCartItem.badgeNumber;
            product.like = shoppingCartItem.like;
            this.item.itemQuantity = shoppingCartItem.badgeNumber;
            this.item.itemUnitPrice = shoppingCartItem.price;
            this.item.itemTotal = shoppingCartItem.price * shoppingCartItem.badgeNumber;
            this.item.itleLiked = shoppingCartItem.like;
            // calculate 
            this.orderedItems.push(this.item);// array of items ordered
            // order object ready to be paid
            this.orderCalculation.orderTotal += this.item.itemTotal;
            this.orderCalculation.items.push(this.item);


          }
        })))
      this.orderCalculation.orderDate = new Date();
      this.orderCalculation.customerId = 'LpVdaZbBcHZpgl5Uib6flNjQfJH3';
      console.log('order total : ' + this.orderCalculation.orderTotal);

      this._products.next(Object.assign({}, this.dataStore).products);
    },
      error => console.log('Could not load products.'));
  }


  setShoppingCartItemsAndLikes(product: Product) {
    if (this.dataStore2.shoppingCartItems.includes(product)) {
      this.dataStore2.shoppingCartItems[this.dataStore2.shoppingCartItems.findIndex(x => x.priority == product.priority)].badgeNumber = product.badgeNumber;
      this.dataStore2.shoppingCartItems[this.dataStore2.shoppingCartItems.findIndex(x => x.priority == product.priority)].like = product.like;
    } else {
      this.dataStore2.shoppingCartItems.push(product);
    }

    this._shoppingCartItems.next(Object.assign({}, this.dataStore2).shoppingCartItems);
    localStorage.setItem('orders', JSON.stringify(this.dataStore2.shoppingCartItems));
    let totalSum;
    this.dataStore2.shoppingCartItems.forEach(product => {
      totalSum += product.price;
    });
    this._total.next(totalSum);

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