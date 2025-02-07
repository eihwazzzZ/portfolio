import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CardGameComponent } from './pages/card-game/card-game.component';
import { CardGameContainerComponent } from './pages/card-game-container/card-game-container.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ElixirComponent } from './components/threejs/elixir/elixir.component';
import { WebsocketComponent } from './pages/websocket/websocket.component';

export const routes: Routes = [
    {
        path: '', component:LayoutComponent, pathMatch:'full'
    },
    {
        path: 'card-game', component: CardGameComponent
    },
    {
        path: 'card-game-container', component: CardsComponent
    },
    {
        path: 'elixir-canvas', component: ElixirComponent
    },
    {
        path: 'websocket', component: WebsocketComponent
    }
];
