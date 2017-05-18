import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Post } from "../../models/post";
import { User } from "../../models/user";
import { Category } from "../../models/category";

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router) { }

    // MIRAR ACA
    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post }) => this.post = data.post);
        window.scrollTo(0, 0);
        User.defaultUser().id === this.post.author.id
            ?document.getElementById('edit').style.display = 'inline'
            :document.getElementById('edit').style.display = 'none'
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~           X                                                                                   |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/
    navAuth(post) {
        this._router.navigate([`/posts/users/${post.author.id}`]);
    }

    // Broken white path: Añadimos el manejador que navega a la direccion correspondiente
    navEdit(post) {
        this._router.navigateByUrl(`/posts/edit/${post.id}`);
    }

    //Broken red path: Añadimos el manejador que dara like.
    eventLike(post) {
        console.log('LIKE',post.title);
    }

    isAuthor(post): boolean {
        return User.defaultUser().id === post.author.id
    }


    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Yellow Path ~~~                       x                                                                         |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/
    @Input() category: Category;

    navCatg(category) {
        console.log('Category: ', category.name);
        this._router.navigate([`/posts/categories/${category.id}`]);
    }
}
