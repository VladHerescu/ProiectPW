import {Item} from './Item';

export class ItemInBag {
  item: Item;
  qty: number;


  constructor(item: Item) {
    this.item = item;
    this.qty = 1;
  }
}
