import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Usuario} from "../../app/usuario";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChatServiceProvider {
  private server: string = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  getChats(user) : Observable<any>{
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/getChats`, user, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  getChatRoom(users) : Observable<any>{
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/getRoom`, users, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  getChatRoomById(room) : Observable<any>{
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/getRoomById`, {room: room}, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  getMessages(room) : Observable<any>{
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/getMessages`, room, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  lastView(user) {
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/lastView`, user, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  createChat(from: Usuario, to: Usuario) {
    let users = {
      userFrom: from,
      userTo: to
    };
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/newChat`, users, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }

  getMessagesNotSeen(user: Usuario) {
    let subject = new Subject<any>();
    this.http.post<any>(`${this.server}/chat/messagesNotSeen`, user, httpOptions).subscribe(data => {
      if(data) {
        subject.next(data);
        subject.complete();
      }
    });
    return subject;
  }
}
