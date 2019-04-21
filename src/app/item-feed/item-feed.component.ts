import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../objects/Item';
import {ItemInBag} from '../objects/ItemInBag';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-feed',
  templateUrl: './item-feed.component.html',
  styleUrls: ['./item-feed.component.scss']
})
export class ItemFeedComponent implements OnInit {

  constructor(private itemService : ItemService) { }

  showDraw = false;
  allItems: Item[] = [];
  role: string = "user";
  showedItems: Item[] = [];
  itemsInBag: ItemInBag[] = [];
  totalCartPrice: number = 0;
  ngOnInit() {
    this.itemService.getItems().subscribe( items => {
      this.allItems = items;
      this.showedItems = this.allItems;
    });
    if (sessionStorage.getItem("cart"))
      this.itemsInBag = JSON.parse(sessionStorage.getItem("cart"));
    this.totalCartPrice = this.getTotalPrice();
  }

  addItemFromCart(item: Item): void {
    for (let i of this.itemsInBag) {
      if (item.name == i.item.name) {
        i.qty++;
        sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
        this.totalCartPrice = this.getTotalPrice();
        window.console.log(item);
        return;
      }
    }
    this.itemsInBag.push(new ItemInBag(item));
    sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
    this.totalCartPrice = this.getTotalPrice();
    window.console.log(item);
  }
  getTotalPrice(): number {
    return this.itemsInBag
      .map(i => i.item.price * i.qty)
      .reduce((sum, current) => sum + current, 0);
  }
  removeItemFromCart(cartItem: Item): void {
    // window.console.log(event);
    this.itemsInBag = this.itemsInBag.filter(i => i.item.name != cartItem.name);
    this.totalCartPrice = this.getTotalPrice();
  }
  clearAllCart(): void {
    this.itemsInBag = [];
    sessionStorage.setItem("cart", JSON.stringify(this.itemsInBag));
    this.totalCartPrice = 0;
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
        this.sortByPrice(true);
        break;
      }
      case "priceDescending": {
        this.sortByPrice(false);
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
  sortByPrice(ascending: boolean): void {
    if (ascending)
      this.showedItems = this.showedItems.sort((a, b) => a.price - b.price);
    else
      this.showedItems = this.showedItems.sort((a, b) => b.price - a.price);
  }
  filterByPrice(lower: string, upper: string) {
    this.showedItems = this.showedItems
      .filter(item => (((lower != "")?item.price > +lower: true) && ((upper != "")?item.price < +upper:true)));
  }
  clearAllSearchParams(): void {
    this.showedItems = this.allItems;
  }
}
