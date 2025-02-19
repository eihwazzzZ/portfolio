import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.client.subscribe('/topic/messages', (message) => {
          console.log('Received: ' + message.body);
        }); 
      },
      onStompError: (frame) => {
        console.error('STOMP Error: ' + frame);
      }
    });
  }

  public connect() {
    this.client.activate();
  }

  public sendMessage(message: string) {
    this.client.publish({
      destination: '/app/sendMessage',
      body: message
    });
  }

  public disconnect() {
    this.client.deactivate();
  }
}
