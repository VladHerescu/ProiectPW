import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from './objects/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient : HttpClient) { }

  basePath: string = "http://localhost/PWeMAG/api/";
  itemPath: string = "items.php";

  getItems(): Observable<any> {
    return this.httpClient.get(this.basePath + this.itemPath);
  }
  uploadFile(item: Item, uploadMedia: any): Observable<any> {
    const uploadData = new FormData();
    uploadData.append("item", JSON.stringify(item));
    uploadData.append("file", uploadMedia, "file");
    return this.httpClient.post(this.basePath + this.itemPath, uploadData);
  }
}
