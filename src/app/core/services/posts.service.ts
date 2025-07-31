import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Post } from "../../models";


@Injectable({
    providedIn: 'root'
})

export class PostsService {
    private getPostsApiUrl = 'http://localhost:3000/api/posts?limit={0}';
    private createPostsApiUrl = 'http://localhost:3000/api/posts'
    private postsBehaviourSubject = new BehaviorSubject<Post[]>([]);

    public posts$ = this.postsBehaviourSubject.asObservable();
    
    constructor(private httpClient: HttpClient) { }

    getPosts(limit: number = 5): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.getPostsApiUrl.replace('{0}', limit.toString()))
        .pipe(
            tap(posts => this.postsBehaviourSubject.next(posts))
        );
    }

    createPost(userId: string, themeName: string, postText: string): Observable<Post> {
        const body = JSON.stringify({userId, themeName, postText})
        return this.httpClient.post<Post>(this.createPostsApiUrl, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}