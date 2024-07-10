import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  standalone: true
})
export class LoaderComponent implements OnInit {
  public loading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
  ngOnInit(): void {}
}
