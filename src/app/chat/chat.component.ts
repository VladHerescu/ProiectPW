import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../objects/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() role: string;
  messageQueue: Message[] = [];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("chat") !== undefined && localStorage.getItem("chat") !== null && localStorage.getItem("chat") != "")
      this.messageQueue = JSON.parse(localStorage.getItem("chat"));
    window.addEventListener("storage",this.storageEventListener.bind(this));
  }
  private storageEventListener(event: StorageEvent) {
    this.messageQueue = JSON.parse(localStorage.getItem("chat"));
  }
  sendMessage(event): void {
    if (event.key == "Enter") {
      var msg = new Message();
      if (this.role === "user")
        msg.fromSite = false;
      else
        msg.fromSite = true;
      msg.timestamp = Date.now();
      msg.text = event.target.value;
      // window.console.log(this.messageQueue);
      this.messageQueue.push(msg);
      localStorage.setItem("chat",JSON.stringify(this.messageQueue));
      event.target.value = "";
    }
  }
}
