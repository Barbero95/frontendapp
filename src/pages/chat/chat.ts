import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Usuario} from "../../app/usuario";
import {Observable} from "rxjs/Observable";
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {Socket} from "ng-socket-io";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userFrom: Usuario;
  userTo: Usuario;
  message: String;
  messages = [];
  users: {};

  room: String;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public socket: Socket,
              public navParams: NavParams,
              public chatService: ChatServiceProvider) {
    this.userFrom = this.navParams.get('from');
    this.userTo = this.navParams.get('to');
    this.users = {
      userFrom: this.userFrom,
      userTo: this.userTo
    };
    this.socket.emit('subscribe', this.users);
    console.log(this.users);
    this.getMessagesSocket().subscribe(msg => {
      this.messages.push(msg);
      if(this.content && this.content._scroll) {
        setTimeout(() => {
          this.content.scrollToBottom();
        });
      }
    });
  }


  ionViewDidLoad() {
    this.chatService.getChatRoom(this.users).subscribe(room => {
      this.room = room.room;
      this.chatService.getMessages(room).subscribe(async messages => {
        this.messages = messages.messages;
      });
      let chat = {
        room: this.room,
        user: this.userFrom._id,
        lastView: Date.now()
      };
      this.chatService.lastView(chat).subscribe();
    });
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  ionViewDidLeave() {
    let chat = {
      room: this.room,
      user: this.userFrom._id,
      lastView: Date.now()
    };
    this.chatService.lastView(chat).subscribe();
  }

  sendMessage() {
    let message = {
      room: this.room,
      message: this.message,
      from: this.userFrom._id,
      to: this.userTo._id,
      created: Date.now(),
      seen: false
    };
    this.socket.emit('add-message', message);
    this.messages.push(message);
    setTimeout(() => {
      this.content.scrollToBottom();
    });
    this.message = "";
  }

  getMessagesSocket() {
    let observable = new Observable(obs => {
      this.socket.on('message', data => {
        obs.next(data);
      });
    });
    return observable;
  }

}
