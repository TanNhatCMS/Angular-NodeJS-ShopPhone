import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGridComponent } from './products-grid.component';

describe('ProductGridComponent', () => {
  let component: ProductsGridComponent;
  let fixture: ComponentFixture<ProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
