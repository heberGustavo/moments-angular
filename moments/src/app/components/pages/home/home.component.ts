import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MomentService } from '../../../services/moment.service';

import { Moment } from '../../../interface/Moments';

import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService){}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(itens => {
      const data = itens.data;
      
      data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-br');
      });
      
      this.allMoments = data;
      this.moments = data;
    })
  }

  search(event: Event): void{
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();
    
    this.moments = this.allMoments.filter(item => item.title.toLocaleLowerCase().includes(value));
  }

}
