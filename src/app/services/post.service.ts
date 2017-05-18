import { Inject, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as moment from "moment";
import { BackendUri } from "./settings.service";
import { Post } from '../models/post';

@Injectable()
export class PostService {

    constructor(
        private _http: Http,
        @Inject(BackendUri) private _backendUri: any) { }

    getPosts(): Observable<Post[]> {

        /*----------------------------------------------------------------------------------------------|
         | ~~~ Pink Path ~~~                    X                                                        |
         |----------------------------------------------------------------------------------------------|
         | Pide al servidor que te retorne los posts ordenados de más reciente a menos, teniendo en     |
         | cuenta su fecha de publicación. Filtra también aquellos que aún no están publicados, pues no |
         | deberían mostrarse al usuario.                                                               |
         |                                                                                              |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de |
         | los datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos       |
         | parámetros:                                                                                  |
         |                                                                                              |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)        |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                            |
         |----------------------------------------------------------------------------------------------*/

        return this._http
            .get(`${this._backendUri}/posts?_sort=publicationDate&_order=DESC&publicationDate_lte=${Date.now()}`)
            .map((response: Response) => {
                return Post.fromJsonToList(response.json());
            });
    }

    getUserPosts(id: number): Observable<Post[]> {

        /*----------------------------------------------------------------------------------------------|
         | ~~~ Red Path ~~~                             x                                                |
         |----------------------------------------------------------------------------------------------|
         | Ahora mismo, esta función está obteniendo todos los posts existentes, y solo debería obtener |
         | aquellos correspondientes al autor indicado. Añade los parámetros de búsqueda oportunos para |
         | que retorne solo los posts que buscamos. Ten en cuenta que, además, deben estar ordenados    |
         | por fecha de publicación descendente y obtener solo aquellos que estén publicados.           |
         |                                                                                              |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de |
         | los datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos       |
         | parámetros:                                                                                  |
         |                                                                                              |
         |   - Filtro por autor: author.id=x (siendo x el identificador del autor)                      |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)        |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                            |
         |----------------------------------------------------------------------------------------------*/

        return this._http
            .get(`${this._backendUri}/posts?author.id=${id}&_sort=publicationDate&_order=DESC&publicationDate_lte=${Date.now()}`)
            .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getCategoryPosts(id: number): Observable<Post[]> {

        /*--------------------------------------------------------------------------------------------------|
         | ~~~ Yellow Path ~~~                     X                                                         |
         |--------------------------------------------------------------------------------------------------|
         | Ahora mismo, esta función está obteniendo todos los posts existentes, y solo debería obtener     |
         | aquellos correspondientes a la categoría indicada. Añade los parámetros de búsqueda oportunos    |
         | para que retorne solo los posts que buscamos. Ten en cuenta que, además, deben estar ordenados   |
         | por fecha de publicación descendente y obtener solo aquellos que estén publicados.               |
         |                                                                                                  |
         | Este Path tiene un extra de dificultad: un objeto Post tiene una colección de objetos Categoria, |
         | y 'JSON Server' no permite filtrado en colecciones anidadas. Por tanto, te toca a ti darle una   |
         | solución a este marrón. Una posibilidad sería aprovechar el operador 'map' de los observables.   |
         | Sirven para transformar flujos de datos y, de alguna forma, es lo que vamos buscando. Podríamos  |
         | obtener todos los posts y luego filtrarlos por categoría en 'map'. Ahí te lo dejo.               |
         |                                                                                                  |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de los |
         | datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos parámetros:   |
         |                                                                                                  |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)            |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                                |
         |--------------------------------------------------------------------------------------------------*/

        return this._http
            .get(`${this._backendUri}/posts?_sort=publicationDate&_order=DESC&publicationDate_lte=${Date.now()}`)
            .map((response: Response) => {
                return Post.fromJsonToList(response.json().filter((elem: Post) => {
                    return elem.categories.findIndex((elem: any) => {
                        return elem.id == id;
                    }) !== -1;
                }))
            });

    }

    getPostDetails(id: number): Observable<Post> {
        console.log('id', id);
        return this._http
            .get(`${this._backendUri}/posts/${id}`)
            .map((response: Response) => Post.fromJson(response.json()));
    }

    createPost(post: Post): Observable<Post> {

        /*----------------------------------------------------------------------------------|
         | ~~~ Purple Path ~~~                  X                                            |
         |----------------------------------------------------------------------------------|
         | Utiliza el cliente HTTP para guardar en servidor el post indicado. La ruta sobre |
         | la cual tienes que hacer la petición POST es '/posts'. Recuerda que siempre que  |
         | se crea una entidad en servidor es una buena práctica retornar la misma con los  |
         | datos actualizados obtenidos tras la inserción; puedes usar la función estática  |
         | 'fromJson() para crar un nuevo objeto Post basado en la respuesta HTTP obtenida. |
         |----------------------------------------------------------------------------------*/
        console.log('Posted: ', post.title);

        return this._http
            .post(`${this._backendUri}/posts`, post)
            .map(response => Post.fromJson(response.json()));
    }

    deletePost(post: Post): Observable<any> {
        console.log('delete: ', post.id);
        return this._http
            .delete(`${this._backendUri}/posts/${post.id}`);
    }

    // return this._http
    // .put(`${this._direcciones.servidor}/contactos/${contacto.id}`, contacto)
    // .map(res => Contacto.desdeJSON(res.json()));

    editPost(post: Post): Observable<any> {
        return this._http
            .put(`${this._backendUri}/posts/${post.id}`, post)
            .map(response => Post.fromJson(response.json()));
    }


}
