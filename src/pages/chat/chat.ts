import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Usuario} from "../../app/usuario";
import {Observable} from "rxjs/Observable";
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {Socket} from "ng-socket-io";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  userNick: string;
  user: Usuario;
  userFrom: Usuario;
  userTo: Usuario;
  actividad: any;
  message: String;
  messages = [];
  users: {};
  chat: {};

  room: String;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public socket: Socket,
              public navParams: NavParams,
              public chatService: ChatServiceProvider,
              public userService: UserServiceProvider) {
    this.userFrom = this.navParams.get('from');
    this.userTo = this.navParams.get('to');
    this.actividad = this.navParams.get('actividad');
    this.userNick = this.navParams.get('userNick');

    this.userService.getUsuario(this.userNick).subscribe(nick => {
      this.user = nick;
    });

    this.users = {
      userFrom: this.userFrom,
      userTo: this.userTo,
      actividad: this.actividad
    };
    this.socket.emit('subscribe', this.users);
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
      this.chat = {
        room: this.room,
        user: this.user._id,
        lastView: Date.now()
      };
      this.chatService.lastView(this.chat).subscribe();
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
      user: this.user._id,
      lastView: Date.now()
    };
    this.chatService.lastView(chat).subscribe();
  }

  sendMessage() {
    let message;
    if(this.userNick === this.userFrom.nick) {
      message = {
        room: this.room,
        message: this.message,
        from: this.userFrom._id,
        to: this.userTo._id,
        created: Date.now(),
        seen: false
      };
    } else {
      message = {
        room: this.room,
        message: this.message,
        from: this.userTo._id,
        to: this.userFrom._id,
        created: Date.now(),
        seen: false
      };
    }

    this.socket.emit('add-message', message);
    this.messages.push(message);
    setTimeout(() => {
      this.content.scrollToBottom();
    });
    this.message = "";
    this.chat = {
      room: this.room,
      user: this.user._id,
      lastView: Date.now()
    };
    this.chatService.lastView(this.chat).subscribe();
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
