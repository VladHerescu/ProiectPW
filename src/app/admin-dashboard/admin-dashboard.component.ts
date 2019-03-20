import { Component, OnInit } from '@angular/core';
import {Item} from '../objects/Item';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  getLocationPath(): string {
    return location.pathname;
  }
}
