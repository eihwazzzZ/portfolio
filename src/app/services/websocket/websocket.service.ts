import { Injectable } from '@angular/core';
import { Client, StompHeaders } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client: Client;

  constructor() {
    const token = localStorage.getItem('token');
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: (frame) => {
        const stompHeaders = new StompHeaders();
        console.log('Connected: ' + frame);
        this.client.subscribe('/topic/messages', (message) => {
          console.log('Received: ' + message.body);
        }, {Authorization: `Bearer ${token}`});
      },
      onStompError: (frame) => {
        console.error('STOMP Error: ' + frame);
      },
      onDisconnect: (frame) => {
        console.log('Disconnected: ' + frame);
      }
    });
  }

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
      const token = localStorage.getItem('token');
      this.client.publish({
        destination: '/app/sendMessage',
        body: message,
        headers: { Authorization: `Bearer ${token}` }
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
