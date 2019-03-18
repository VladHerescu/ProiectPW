import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../objects/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor() { }
  @Input() item: Item;
  @Output() emittedValue = new EventEmitter();
  ngOnInit() {
  }

  addToCart(): void {
    this.emittedValue.emit(this.item);
  }
}
