import { Component, Input, Inject } from '@angular/core';

import { Post } from '../../models/post';
import { BackendUri } from '../../services/settings.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    selectPost: Post;
    constructor(
        private _router: Router,) { }

    @Input() posts: Post;

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                       x                                                                          |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/
     showAuth(post:Post){
        console.log('Author: ',post.author.name);
        this._router.navigate([`/posts/users/${post.author.id}`]);
     }

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~                                                                                              |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/

    showPost(post: Post){
         console.log('name : ',post.title);
         this._router.navigate([`/posts/${post.id}`]);
    }


}
