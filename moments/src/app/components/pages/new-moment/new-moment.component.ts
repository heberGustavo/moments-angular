import { Component } from '@angular/core';
import { MomentFormComponent } from "../../moment-form/moment-form.component";
import { Moment } from '../../../interface/Moments';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-new-moment',
  imports: [MomentFormComponent],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText: string = "Compartilhar";

  constructor(private momentService: MomentService) {}

  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    
    if(moment.image)
      formData.append('image', moment.image);

    console.log(formData);
    await this.momentService.createMoment(formData).subscribe();
  }
}
