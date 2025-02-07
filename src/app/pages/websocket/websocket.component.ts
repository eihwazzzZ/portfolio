import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [],
  templateUrl: './websocket.component.html',
  styleUrl: './websocket.component.css'
})
export class WebsocketComponent {

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    // Conectar al WebSocket cuando el componente se inicializa
    this.websocketService.connect();
  }

  sendMessage() {
    // Enviar un mensaje cuando se presione el botón
    const message = 'Hola desde Angular';
    this.websocketService.sendMessage(message);
  }

  ngOnDestroy() {
    // Desconectar cuando el componente sea destruido
    this.websocketService.disconnect();
  }

}
