import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() rating: number = 0;
  @Output() outRating = new EventEmitter<string>();
  starWidth: number = 0;
  constructor(){
    this.rating = 0;
    this.starWidth = (this.rating * 90) /5;

  }
  ngOnChanges(): void {
    this.starWidth = (this.rating * 90) /5;
  }
  viewRating(){
    this.outRating.emit(`Đánh giá sản phẩm là: ${this.rating}`);
  }

}
