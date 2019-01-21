import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Chat} from "../../app/chat";
import {Usuario} from "../../app/usuario";
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {Socket} from "ng-socket-io";
import {Observable} from "rxjs/Observable";
import {ChatPage} from "../chat/chat";
import {Storage} from "@ionic/storage";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  user: Usuario;
  users: Usuario[] = [];
  nick: string = "";

  messages = [];
  message: String;

  chats: Chat[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public socket: Socket,
              public _modalCtrl: ModalController,
              public userService: UserServiceProvider,
              public storage: Storage,
              public chatService: ChatServiceProvider) {
    this.user = this.navParams.get('usuario');
    this.storage.get('nick').then( (nick) => {
      console.log("propietario valor directo de storage: ", nick);
      this.nick = nick;
    });
    this.getUsers().subscribe(data => {
      console.log('holaa', data);
    });
  }

  ionViewDidLoad() {
    this.reloadChats();
    // this.userService.getConnected().subscribe(usrs => {
    //   this.users = usrs;
    //   console.log(this.users)
    // });
  }
  ionViewDidEnter() {
    this.reloadChats();
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', data => {
        observer.next(data);
      })
    });
    return observable;
  }

  openChat(user) {
    this.navCtrl.push(ChatPage, {from: this.user, to: user});
  }
  openChatFromUsers(users) {
    let user = users.find(usr => usr.userId != this.user._id);
    this.userService.getUserById(user.userId).subscribe(user => {
      this.navCtrl.push(ChatPage, {
        from: this.user,
        to: user,
        actividad: '',
        userNick: this.nick
      });
    });
  }

  reloadChats() {
    this.chatService.getChats(this.user).subscribe(async chats => {
      this.chats = chats;
      await this.chats.sort((a: Chat, b: Chat) => {
        return new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime();
      });
      this.chats.forEach(chat => {
        chat.users.forEach(user => {
          this.userService.getUsuario(user.userName).subscribe(usr => {
            user.userFoto = usr.imagen;
          });
        });
        //chat.lastMessageDate = new Date(chat.lastMessageDate);
        chat.lastMessageDateString = moment(chat.lastMessageDate).fromNow();
      });
    });
  }
}
