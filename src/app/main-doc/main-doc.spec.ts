import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainDoc } from './main-doc';

describe('MainDoc', () => {
  let component: MainDoc;
  let fixture: ComponentFixture<MainDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDoc],
    }).compileComponents();

    fixture = TestBed.createComponent(MainDoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
