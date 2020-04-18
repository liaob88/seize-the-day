import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    // tslint:disable-next-line: no-non-null-assertion
    component = fixture.componentInstance;
    component.shape = 'circle';
    component.color = 'pink';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button がクリックされた時、 eventEmitter が emit されること', () => {
    spyOn(component.clicked, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('className()', () => {
    const spy = spyOnProperty(component, 'className').and.returnValue(
      `button ${component.shape} ${component.color}`
    );
    expect(component.className).toBe('button circle pink');
    expect(spy).toHaveBeenCalled();
  });
});
