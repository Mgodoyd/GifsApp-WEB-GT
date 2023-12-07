import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
    constructor( private gifsSevice : GifsService) { }

    get gifs(): Gif[] {
      return this.gifsSevice.gifsList;
    }
}
