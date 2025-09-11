import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../interface/Moments';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-moment',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private momentService: MomentService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((itemMoment) => (this.moment = itemMoment.data));
  }

  async removeHandler(id: number) {
    await this.momentService.deleteMoment(id).subscribe();

    this.messageService.add("Momento excluído com sucesso!");

    this.router.navigate(["/"]);
  }
}
