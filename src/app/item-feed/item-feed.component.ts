import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../objects/Item';
import { ItemsMock} from '../mocks/item_mocks';
import {ItemInBag} from '../objects/ItemInBag';

@Component({
  selector: 'app-item-feed',
  templateUrl: './item-feed.component.html',
  styleUrls: ['./item-feed.component.scss']
})
export class ItemFeedComponent implements OnInit {

  constructor() { }
  allItems: Item[] = ItemsMock;
  showedItems: Item[] = ItemsMock;
  itemsInBag: ItemInBag[] = [];
  totalCartValue: number = 0;
  ngOnInit() {
    if (sessionStorage.getItem("cart"))
      this.itemsInBag = JSON.parse(sessionStorage.getItem("cart"));
    this.totalCartValue = this.getTotalValue();
  }

  addItemFromCart(item: Item): void {
    for (let i of this.itemsInBag) {
      if (item.name == i.item.name) {
        i.qty++;
        sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
        this.totalCartValue = this.getTotalValue();
        window.console.log(item);
        return;
      }
    }
    this.itemsInBag.push(new ItemInBag(item));
    sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
    this.totalCartValue = this.getTotalValue();
    window.console.log(item);
  }
  getTotalValue(): number {
    return this.itemsInBag
      .map(i => i.item.value * i.qty)
      .reduce((sum, current) => sum + current, 0);
  }
  removeItemFromCart(cartItem: Item): void {
    // window.console.log(event);
    this.itemsInBag = this.itemsInBag.filter(i => i.item.name != cartItem.name);
    this.totalCartValue = this.getTotalValue();
  }
  clearAllCart(): void {
    this.itemsInBag = [];
    sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
    this.totalCartValue = 0;
  }

  filterByName(event): void {
    // window.console.log(event);
    this.showedItems = this.allItems.filter(item => item.name.toLocaleLowerCase().indexOf(event.target.value.toLocaleLowerCase()) > -1);
  }
  searchAndSort(sortingMethodElement: any, priceRangeFromElement: any, priceRangeToElement: any): void {
    const sortingMethod = sortingMethodElement.options[sortingMethodElement.selectedIndex].value;
    const priceRangeFrom = priceRangeFromElement.value;
    const priceRangeTo = priceRangeToElement.value;
    window.console.log(sortingMethod + " " + priceRangeFrom + " " + priceRangeTo);
    this.filterByPrice(priceRangeFrom,priceRangeTo);
    switch (sortingMethod) {
      case "nameAscending": {
        this.sortByName(true);
        break;
      }
      case "nameDescnding": {
        this.sortByName(false);
        break;
      }
      case "priceAscending": {
        this.sortByValue(true);
        break;
      }
      case "priceDescending": {
        this.sortByValue(false);
        break;
      }
      default: {
        break;
      }
    }
  }
  sortByName(ascending: boolean): void {
    if (ascending)
      this.showedItems = this.showedItems.sort((a, b) => a.name.localeCompare(b.name));
    else
      this.showedItems = this.showedItems.sort((a, b) => b.name.localeCompare(a.name));
  }
  sortByValue(ascending: boolean): void {
    if (ascending)
      this.showedItems = this.showedItems.sort((a, b) => a.value - b.value);
    else
      this.showedItems = this.showedItems.sort((a, b) => b.value - a.value);
  }
  filterByPrice(lower: string, upper: string) {
    this.showedItems = this.showedItems
      .filter(item => (((lower != "")?item.value > +lower: true) && ((upper != "")?item.value < +upper:true)));
  }
  clearAllSearchParams(): void {
    this.showedItems = this.allItems;
  }
}
