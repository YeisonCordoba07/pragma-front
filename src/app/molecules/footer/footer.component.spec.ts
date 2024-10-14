import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {By} from "@angular/platform-browser";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should display the phone number', () => {
    const phoneElement: HTMLElement = fixture.debugElement.query(By.css('.footer-title')).nativeElement;
    expect(phoneElement.textContent).toContain('+7 (495) 000-00-00');
  });

  it('should display the working hours', () => {
    const hoursElement: HTMLElement = fixture.debugElement.query(By.css('.footer-date')).nativeElement;
    expect(hoursElement.textContent).toBe('mon-fri 9:00 - 18:00');
  });

  it('should display the address', () => {
    const addressElement: HTMLElement = fixture.debugElement.query(By.css('.footer-direction-text')).nativeElement;
    expect(addressElement.textContent).toContain('Moscow');
    expect(addressElement.textContent).toContain('ul. Name d. 1');
  });

  it('should display the email address', () => {
    const emailElement: HTMLElement = fixture.debugElement.query(By.css('.footer-email-text')).nativeElement;
    expect(emailElement.textContent).toBe('Email@email.ru');
  });

  it('should display the social media icons', () => {
    const socialMediaIcons = fixture.debugElement.queryAll(By.css('.icon-container img'));
    expect(socialMediaIcons.length).toBe(3);

    const iconSrcs = socialMediaIcons.map(icon => icon.nativeElement.src);
    expect(iconSrcs[0]).toContain('vk_logo.svg');
    expect(iconSrcs[1]).toContain('facebook_logo.svg');
    expect(iconSrcs[2]).toContain('twitter_logo.svg');
  });

  it('should display the footer logo', () => {
    const logoElement: HTMLImageElement = fixture.debugElement.query(By.css('.footer-logo')).nativeElement;
    expect(logoElement.src).toContain('logo_pragma.svg');
  });

  it('should display the copyright text', () => {
    const copyrightElement: HTMLElement = fixture.debugElement.query(By.css('.cc-container p')).nativeElement;
    expect(copyrightElement.textContent).toContain('© 2021-2021');
    expect(copyrightElement.textContent).toContain('Company name. All rights reserved');
  });

  it('should display the Privacy Policy link', () => {
    const privacyPolicyElement: HTMLElement = fixture.debugElement.query(By.css('.cc-container span')).nativeElement;
    expect(privacyPolicyElement.textContent).toBe('Privacy Policy');
  });
});
