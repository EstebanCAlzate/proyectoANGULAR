import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/post';

@Component({
    selector: "header-bar",
    templateUrl: "header-bar.component.html",
    styleUrls: ["header-bar.component.css"]
})
export class HeaderBarComponent {

    @Input() search: String;
    constructor(private _postService: PostService,
        private _router: Router) { }

    //RED WINE PATH
    navSearch(search) {
        this._router.navigate([`/posts/search/${search}`]);
    }
}
