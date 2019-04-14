import { Component, OnInit } from '@angular/core';
import {Item} from '../objects/Item';
import {ItemService} from '../item.service';

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

  constructor(private itemService: ItemService) { }

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
  uploadPost() {
    window.console.log(this.uploadedItem);
    this.uploadedItem.id = 0;
    this.uploadedItem.photo = "";
    this.itemService.uploadFile(this.uploadedItem,this.uploadMedia).subscribe(
      (res) => {
        window.console.log("success");
        this.clearUploadItem();
      }
    );
  }
  isOnDesktop(): boolean {
    if (innerWidth < 450) {
      return true;
    } else {
      return false;
    }
  }
}
