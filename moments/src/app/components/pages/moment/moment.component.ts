import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Moment } from '../../../interface/Moments';
import { MomentService } from '../../../services/moment.service';
import { environment } from '../../../../environment/environment';
import { MessageService } from '../../../services/message.service';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../interface/Comment';

@Component({
  selector: 'app-moment',
  imports: [CommonModule, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private momentService: MomentService,
    private messageService: MessageService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((itemMoment) => (this.moment = itemMoment.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.deleteMoment(id).subscribe();

    this.messageService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }

  async onSubmit() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched(); // força exibir os erros
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messageService.add("Comentário adicionado!");

    //Limpa os dados
    this.commentForm.reset();
  }
}
