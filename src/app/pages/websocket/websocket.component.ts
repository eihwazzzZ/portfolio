import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [],
  templateUrl: './websocket.component.html',
  styleUrl: './websocket.component.css'
})
export class WebsocketComponent {

  constructor(private websocketService: WebsocketService, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.websocketService.connect();
    } else {
      console.log('User not authenticated, WebSocket connection not established.');
    }
  }

  sendMessage() {
    const message = 'Hola desde Angular';
    this.websocketService.sendMessage(message);
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }

}
