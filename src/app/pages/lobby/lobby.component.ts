import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

  constructor(private webSocketService: WebsocketService) { }

  async findGameSession() {
    try {
      await this.webSocketService.connect();
      const message = 'waiting-for-player';
      this.webSocketService.sendMessage(message);
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
    }
  }

}
