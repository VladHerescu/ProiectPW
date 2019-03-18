import { Component, OnInit } from '@angular/core';
import {Message} from '../objects/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageQueue: Message[] = [
    {
      fromSite : true,
      text  : "funny me",
      timestamp : 0
    },
    {
      fromSite : true,
      text  : "funny me",
      timestamp : 0
    },
    {
      fromSite : false,
      text  : "funny me",
      timestamp : 0
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  sendMessage(event): void {
    if (event.key == "Enter") {
      var msg = new Message();
      msg.fromSite = false;
      msg.timestamp = Date.now();
      msg.text = event.target.value;
      // window.console.log(this.messageQueue);
      this.messageQueue.push(msg);
      event.target.value = "";
    }
  }
}
