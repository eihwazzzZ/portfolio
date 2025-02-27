import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatCardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  profession:string = "Fullstack Developer";
  description:string = "I am continuously seeking to improve my knowledge, as well as my soft and hard skills";
  email:string = "Martinbrito1985@gmail.com";

  goToLogin = () => {
    this.router.navigate(['login']);
  };

}
