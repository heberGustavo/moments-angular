import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../interface/Moments';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MomentFormComponent } from "../../moment-form/moment-form.component";
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-edit-moment',
  imports: [CommonModule, MomentFormComponent],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
})
export class EditMomentComponent implements OnInit{
  moment?: Moment;
  btnText: string = "Editar";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private momentService: MomentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
  }

  async editHandler(momentData: Moment){
    const id = momentData.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    
    if(momentData.image)
      formData.append('image', momentData.image);

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messageService.add("Momento atualizado com sucesso!");

    this.router.navigate(["/"]);
  }
}
