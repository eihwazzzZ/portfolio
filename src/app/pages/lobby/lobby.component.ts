import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { WebsocketMessage } from '../../interfaces/websocket-message';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

  private wsMessage: WebsocketMessage | undefined;

  constructor(private webSocketService: WebsocketService, private authService: AuthService) { }

  async findGameSession() {
    if (this.authService.isAuthenticated()) {
      try {
        await this.webSocketService.connect();
        this.wsMessage = {
          type: 'game-action',
          payload: {
            action: 'waiting-for-player'
          }
        }
        this.webSocketService.sendMessage(JSON.stringify(this.wsMessage));
      } catch (error) {
        console.error('Error establishing WebSocket connection:', error);
      }
    } else {
      console.log('User not authenticated, WebSocket connection not established.');
    }
  }

}
