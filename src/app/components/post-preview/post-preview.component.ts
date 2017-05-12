import { Component, Input, Output, EventEmitter } from '@angular/core';


import { Post } from "../../models/post";
import { User } from "../../models/user";

@Component({
    selector: "post-preview",
    templateUrl: "post-preview.component.html",
    styleUrls: ["post-preview.component.css"]
})
export class PostPreviewComponent {

    @Input() post: Post;

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~   X                                                                                              |
     |------------------------------------------------------------------------------------------------------------------|
     | Expón un atributo de salida con el decorador correspondiente. El tipo de dicho atributo debe permitir la emisión |
     | de eventos; la idea es enviar al componente padre el usuario sobre el cuál se ha hecho clic. Y puesto que dicho  |
     | clic se realiza en el template de este componente, necesitas, además, un manejador para el mismo.                |
     |------------------------------------------------------------------------------------------------------------------*/

    @Output() seleccionadoAuth: EventEmitter<Post> = new EventEmitter();
    @Output() seleccionadoPost: EventEmitter<Post> = new EventEmitter();

    notifiSelectAuth(post:Post):void{
        console.log('seleccionado');
        this.seleccionadoAuth.emit(post);
    }

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~                                                                                               |
     |------------------------------------------------------------------------------------------------------------------|
     | Expón un atributo de salida con el decorador correspondiente. El tipo de dicho atributo debe permitir la emisión |
     | de eventos; la idea es enviar al componente padre el post sobre el cuál se ha hecho clic. Y puesto que dicho     |
     | clic se realiza en el template de este componente, necesitas, además, un manejador para el mismo.                |
     |------------------------------------------------------------------------------------------------------------------*/

    notifiSelectPost(post:Post):void{
        this.seleccionadoPost.emit(post);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }
}
