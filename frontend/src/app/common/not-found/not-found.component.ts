import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardContent,
    MatCard,
    MatAnchor
  ],
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
