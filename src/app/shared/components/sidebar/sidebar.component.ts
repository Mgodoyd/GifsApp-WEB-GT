import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
    constructor(private gifsService: GifsService) { }

get historial():string[]{
  return this.gifsService.tagsHistory;
}

searchTag(tag: string): void{
  this.gifsService.searchTags(tag);
  }
}
