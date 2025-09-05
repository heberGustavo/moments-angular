import { Component } from '@angular/core';
import { MomentFormComponent } from "../../moment-form/moment-form.component";

@Component({
  selector: 'app-new-moment',
  imports: [MomentFormComponent],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText: string = "Compartilhar";
}
