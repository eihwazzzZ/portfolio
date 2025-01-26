import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CardGameComponent } from './pages/card-game/card-game.component';

export const routes: Routes = [
    {
        path: '', component:LayoutComponent, pathMatch:'full'
    },
    {
        path: 'card-game', component: CardGameComponent
    }
];
