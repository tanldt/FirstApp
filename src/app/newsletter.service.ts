import { Injectable } from '@angular/core';
import { firebaseConfig } from './firebase.config';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private readonly endpoint = `${firebaseConfig.databaseUrl.replace(/\/$/, '')}/subscribers.json`;

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        subscribedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Unable to save subscription');
    }
  }
}
