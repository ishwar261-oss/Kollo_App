import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Leftpanel } from './leftpanel';

describe('Leftpanel', () => {
  let component: Leftpanel;
  let fixture: ComponentFixture<Leftpanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leftpanel],
    }).compileComponents();

    fixture = TestBed.createComponent(Leftpanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
