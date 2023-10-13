import { Component } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'hotel-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  comments$ = this.commentService.getComments();

  constructor(private commentService: CommentService){

  }

}
