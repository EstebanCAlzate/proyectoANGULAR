import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent {
    //para el formulario.
    // private _postSubscription: Subscription;

    // constructor(
    //     private _postService: PostService,
    //     private _router: Router) { }

    // ngOnDestroy(): void {
    //     this._unsubscribePostCreation();
    // }

    // createPost(post: Post): void {
    //     this._unsubscribePostCreation();
    //     this._postSubscription = this._postService.createPost(post).subscribe(() => this._router.navigate(["/"]));
    // }

    // private _unsubscribePostCreation(): void {
    //     if (this._postSubscription) {
    //         this._postSubscription.unsubscribe();
    //     }
    // }
}