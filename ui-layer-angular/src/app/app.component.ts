import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { MessagingService } from "./shared/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  message;
  constructor(private fileService: FileService, private messagingService: MessagingService) { }

  calculate() {
    this.fileService.postParameters({
      userid: 'GET USERID FROM BROWSER CONSOLE',
      x: '1',
      y: '3',
      z: '4'
    }).subscribe();
  }
  ngOnInit() {
    const userId = 'user';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = (this.messagingService.currentMessage);
  }
}
