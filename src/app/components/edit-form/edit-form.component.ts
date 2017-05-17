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
export class EditFormComponent
//implements OnInit
{
  titulo: string =  "user";
  posts: Post[];

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.data.forEach((data: { posts: Post[] }) => this.posts = data.posts);
    window.scrollTo(0, 0);
    console.log(this.posts);
  }
}
