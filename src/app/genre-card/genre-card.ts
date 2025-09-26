import { Component, Input } from '@angular/core';
import { Genre } from '../genres/genres';

@Component({
  selector: 'app-genre-card',
  imports: [],
  templateUrl: './genre-card.html',
  styleUrl: './genre-card.css'
})
export class GenreCard {
  // The @Input decorator allows this component to receive data from its parent component
  // We expect a Genre object to be passed in
  // the ! after genre tells TypeScript that we are sure this property will be initialized
  @Input() genre!: Genre;

}
