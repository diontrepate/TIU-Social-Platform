import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLandingPageComponent } from './pre-landing-page.component';

describe('PreLandingPageComponent', () => {
  let component: PreLandingPageComponent;
  let fixture: ComponentFixture<PreLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
