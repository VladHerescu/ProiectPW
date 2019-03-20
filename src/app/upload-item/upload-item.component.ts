import { Component, OnInit } from '@angular/core';
import {Item} from '../objects/Item';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {

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
  clearUploadItem(): void {
    this.fileLoaded = false;
    this.uploadedItem = new Item();
    this.imageSrc = null;
    this.uploadMedia = null;
  }

  isOnDesktop(): boolean {
    if (innerWidth < 450) {
      return true;
    } else {
      return false;
    }
  }
}
