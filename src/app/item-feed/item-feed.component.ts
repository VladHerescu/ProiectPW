import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../objects/Item';
import { ItemsMock} from '../mocks/item_mocks';

@Component({
  selector: 'app-item-feed',
  templateUrl: './item-feed.component.html',
  styleUrls: ['./item-feed.component.scss']
})
export class ItemFeedComponent implements OnInit {

  constructor() { }
  allItems: Item[] = ItemsMock;
  showedItems: Item[] = ItemsMock;
  itemsInBag: Item[] = [];
  totalCartValue: number = 0;
  ngOnInit() {
    if (sessionStorage.getItem("cart"))
      this.itemsInBag = JSON.parse(sessionStorage.getItem("cart"));
    this.totalCartValue = this.getTotalValue();
  }

  addOrRemoveItemFromCart(item: Item): void {
    if (this.itemsInBag.find(i => i.name == item.name))
      this.itemsInBag = this.itemsInBag.filter(e => e.name !== item.name);
    else
      this.itemsInBag.push(item);
    sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
    this.totalCartValue = this.getTotalValue();
    window.console.log(item);
  }
  getTotalValue(): number {
    return this.itemsInBag
      .map(i => i.value)
      .reduce((sum, current) => sum + current, 0);
  }
  removeItemFromCart(cartItem: Item): void {
    window.console.log(event);
    this.itemsInBag = this.itemsInBag.filter(item => item.name != cartItem.name);
    this.totalCartValue = this.getTotalValue();
  }
  clearAllCart(): void {
    this.itemsInBag = [];
    this.totalCartValue = 0;
  }

  filterByName(event): void {
    // window.console.log(event);
    this.showedItems = this.allItems.filter(item => item.name.toLocaleLowerCase().indexOf(event.target.value.toLocaleLowerCase()) > -1);
  }
  sortByName(): void {
    this.showedItems = this.showedItems.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByValue(): void {

  }

}
