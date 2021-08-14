import { Injectable } from '@angular/core';
import { NewsfeedsLikes } from '../model/newsfeedslikes';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedsLikesService {

    NewsfeedsLikes: NewsfeedsLikes[] = [];

  constructor() { }

  getnewsfeedslikesservice(): NewsfeedsLikes[] {
    return this.NewsfeedsLikes;
  }
}
