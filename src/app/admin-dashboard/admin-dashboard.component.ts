import { Component, OnInit } from '@angular/core';
import {Item} from '../objects/Item';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  fileLoaded: boolean;
  uploadMedia: any;
  uploadedItem: Item = new Item();
  imageSrc: string | ArrayBuffer;

  constructor() { }

  ngOnInit() {
  }
  onFileChanged(event) {
    this.fileLoaded = true;
    const file = event.target.files[0];
    this.uploadMedia = file;
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
    window.console.log(file);
  }
}
