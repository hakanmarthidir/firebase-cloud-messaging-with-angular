import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { MessagingService } from "./shared/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //message;
  messages: string[] = [];
  userid;
  constructor(private fileService: FileService, private messagingService: MessagingService) { }

  calculate() {
    const parameterObject = {
      userid : this.messagingService.currentToken.value,
      x: '1',
      y: '3',
      z: '4'
    };
    this.fileService.postParameters(parameterObject).subscribe();
  }
  ngOnInit() {
    const userId = 'user';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    //this.message = (this.messagingService.currentMessage);
    (this.messagingService.currentMessage.subscribe((message: any) => {
      this.messages.push(message);
    }));
  }
}
