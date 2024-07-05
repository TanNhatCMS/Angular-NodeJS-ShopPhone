import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  template: `
    <ngb-rating [(rate)]="rating" [max]="5" [readonly]="true">
      <ng-template let-fill="fill" let-index="index">
        <i class="fa fa-star" [class.fa-star-half-alt]="fill === 0.5" [class.fa-star-o]="fill === 0"></i>
      </ng-template>
    </ngb-rating>
  `,
  styles: ['* {color: #EDA800; font-size: 1.2rem;}'],
  standalone: true,
  imports: [
    NgbRatingModule
  ],
  providers: [NgbRatingConfig]
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  readonly = true;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
  //  config.starTemplate = `<i class="fa fa-star"></i>`;
  }

  ngOnInit() {
  }

}
