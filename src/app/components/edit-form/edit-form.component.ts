import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Post } from "../../models/post";
import { User } from "../../models/user";

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  nowDatetimeLocal: string;
  publicationDateScheduled: boolean = false;

  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

  ngOnInit(): void {
    this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
  }

  private _formatDateToDatetimeLocal(date: Date) {
    return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
  }

  private _fixPad(datePart: number, length: number): string {
    return `0000${datePart}`.slice(-length);
  }

  private _getPostPublicationDate(formPublicationDate: string): number {
    let publicationDate: Date;
    if (this.publicationDateScheduled) {
      publicationDate = new Date(formPublicationDate);
      if (isNaN(publicationDate.getTime())) {
        publicationDate = new Date();
      }
    }
    else {
      publicationDate = new Date();
    }
    return publicationDate.getTime();
  }

  setScheduling(schedule: boolean): void {
    this.publicationDateScheduled = schedule;
  }

  submitPost(form: FormGroup): void {
    
    let post: Post = Post.fromJson(form.value);
    post.likes = 0;
    post.author = User.defaultUser();
    post.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
    post.title = form.value.tittle;
    post.categories = [];
    post.media = '';
    this.postSubmitted.emit(post);
  }
}
