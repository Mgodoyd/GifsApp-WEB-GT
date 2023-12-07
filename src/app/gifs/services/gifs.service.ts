import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifsList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = '10PYbkMMQ1Fk9JRyh6yOX3qLSxu3WtyD';

  constructor(private http: HttpClient) {
    this.readLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeGifs(tags: string) {
    tags = tags.toLowerCase();
    if (this._tagsHistory.includes(tags)) {
      this._tagsHistory = this._tagsHistory.filter((tag) => tag !== tags);
    }

    this._tagsHistory.unshift(tags);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory));
  }

  private readLocalStorage() {
    if (localStorage.getItem('tags')) {
      this._tagsHistory = JSON.parse(localStorage.getItem('tags')!);

      if (this._tagsHistory.length === 0) return;
      this.searchTags(this._tagsHistory[0]);
    }
  }
  searchTags(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizeGifs(tag);

    this.http
      .get<SearchResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=50`
      )
      .subscribe((data) => {
        console.log(data);
        this.gifsList = data.data;
      });



    // fetch(
    //   `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=100`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }
}
