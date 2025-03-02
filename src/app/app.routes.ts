import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CardGameComponent } from './pages/card-game/card-game.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ElixirComponent } from './components/threejs/elixir/elixir.component';
import { WebsocketComponent } from './pages/websocket/websocket.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';
import { LobbyComponent } from './pages/lobby/lobby.component';

export const routes: Routes = [
    {
        path: '', component:LayoutComponent, pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'lobby',
        component: LobbyComponent
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'card-game',
            component: CardGameComponent
          },
          {
            path: 'card-game-container',
            component: CardsComponent
          },
          {
            path: 'elixir-canvas',
            component: ElixirComponent
          },
          {
            path: 'websocket',
            component: WebsocketComponent
          }
        ]
      },
    {
        path: '**',
        redirectTo: 'login'
    },
];
