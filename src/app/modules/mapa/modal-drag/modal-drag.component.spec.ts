import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDragComponent } from './modal-drag.component';

describe('ModalDragComponent', () => {
  let component: ModalDragComponent;
  let fixture: ComponentFixture<ModalDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDragComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
