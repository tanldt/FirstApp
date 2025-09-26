import { Component, signal, Signal } from '@angular/core';
import { GenreCard } from '../genre-card/genre-card'; //import genre card component

//interfaces are a TypeScript feature to define object shapes
// Here, a Genre has a required name and an optional description, the ? makes it optional/nullable.
export interface Genre {
  name: string;
  description?: string;
}

@Component({
  selector: 'app-genres',
  imports: [GenreCard],
  templateUrl: './genres.html',
  styleUrl: './genres.css'
})

export class Genres {
  // Using Angular Framework's signal to create a list of genres
  //note the use of the Genre interface to populate the list
  genres = signal<Genre[]>([
    { name: 'Science Fiction', description: 'science fiction stories, space, tech.' },
    { name: 'Fantasy', description: 'Magic, worlds, mythic tales.' },
    { name: 'Mystery', description: 'Crime, puzzles, investigations.' },
  ]);

  // This method is a behaviour and it allows us to add a new genre to the list
  // It takes two HTML input elements as parameters to get the values

  addGenreFrom(nameInput: HTMLInputElement, descInput: HTMLInputElement) {
    // trim whitespace from inputs
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    // If the name is empty, we don't add a new genre
    if (!name) return;
    //create a new genre object
    const newGenre: Genre = {
      name: name,
      description: description || undefined,
    };

    // Update the genres signal by adding a new genre object to the existing list
    // We use the spread operator (...) to create a new array with the existing genres plus the new one
    // (list) => is a callback function that allows us to work with the current list of genres
    this.genres.update((list) => {
      const updatedList = [...list, newGenre];

      // After adding, it clears the input fields for user convenience
      nameInput.value = '';
      descInput.value = '';
      return updatedList;
    });
  }
}


