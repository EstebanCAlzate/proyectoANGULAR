import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { Post } from "../../models/post";
import { User } from "../../models/user";
import { PostService } from "app/services/post.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  post: Post;
  nowDatetimeLocal: string;
  publicationDateScheduled: boolean = false;

  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.data.forEach((data: { post: Post }) => this.post = data.post);
    window.scrollTo(0, 0);
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
