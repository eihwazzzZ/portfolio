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
      },
      onDisconnect: (frame) => {
        console.log('Disconnected: ' + frame);
      }
    });
  }

  /*public connect() {
    if (!this.client.active) {
      this.client.activate();
    } else {
      console.log('WebSocket already connected');
    }
  }*/
  
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.client.active) {
        resolve();
      } else {
        this.client.activate();
        const interval = setInterval(() => {
          if (this.client.active) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      }
    });
  }

  public sendMessage(message: string) {
    if (this.client.active) {
      this.client.publish({
        destination: '/app/sendMessage',
        body: message
      });
    } else {
      console.log('WebSocket is not connected');
    }
  }

  public disconnect() {
    if (this.client.active) {
      this.client.deactivate();
    } else {
      console.log('WebSocket already disconnected');
    }
  }
}
