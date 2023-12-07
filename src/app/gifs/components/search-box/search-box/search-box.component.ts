import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Search</h5>
    <input type="text" class="form-control" placeholder="Search gifs..."
    (keyup.enter) = "searchTag()"
    #txtTagInput>
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
constructor(private gifsService: GifsService) { }

@ViewChild('txtTagInput') 
public txtTagInput!: ElementRef<HTMLInputElement>;

searchTag() {
  const newTag = this.txtTagInput.nativeElement.value;
  this.gifsService.searchTags(newTag);
  this.txtTagInput.nativeElement.value = '';




  }
}
