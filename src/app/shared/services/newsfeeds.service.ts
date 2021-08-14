import { Injectable } from '@angular/core';
import { Newsfeeds } from '../model/Newsfeeds';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedsService {

  Newsfeeds: Newsfeeds[] = [];

  constructor() { }

  getnewsfeedsservice(): Newsfeeds[] {
    return this.Newsfeeds;
  }
}
