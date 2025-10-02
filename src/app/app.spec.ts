import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NewsletterService } from './newsletter.service';

describe('App', () => {
  let subscribeSpy: jasmine.Spy;

  beforeEach(async () => {
    subscribeSpy = jasmine.createSpy('subscribe').and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        { provide: NewsletterService, useValue: { subscribe: subscribeSpy } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a validation message for invalid email', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const input = fixture.nativeElement.querySelector('input[type="email"]') as HTMLInputElement;

    input.value = 'invalid-email';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.signup__hint');
    expect(hint?.textContent?.trim()).toBe('Please enter a valid email address.');
    expect(subscribeSpy).not.toHaveBeenCalled();
  });

  it('should subscribe with a valid email', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const input = fixture.nativeElement.querySelector('input[type="email"]') as HTMLInputElement;

    input.value = 'reader@example.com';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();

    expect(subscribeSpy).toHaveBeenCalledWith('reader@example.com');
    fixture.detectChanges();
    const success = fixture.nativeElement.querySelector('.signup__hint--success');
    expect(success?.textContent?.trim()).toContain("You're on the list!");
  });
});
