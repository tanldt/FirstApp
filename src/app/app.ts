import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly fb = inject(FormBuilder);
  private readonly newsletter = inject(NewsletterService);

  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly landingForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  readonly emailControl = computed(() => this.landingForm.controls.email);

  async submit(): Promise<void> {
    this.isSuccess.set(false);
    this.errorMessage.set(null);

    if (this.landingForm.invalid) {
      this.landingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    try {
      await this.newsletter.subscribe(this.emailControl().value);
      this.isSuccess.set(true);
      this.landingForm.reset({ email: '' });
    } catch (error) {
      console.error('Failed to save subscription', error);
      this.errorMessage.set('We could not save your email. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
