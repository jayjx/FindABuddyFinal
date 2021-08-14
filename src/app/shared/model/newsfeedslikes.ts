export class NewsfeedsLikes {
    idnewsfeeds: string;
    likes: string;
    

    constructor(likes:string,idnewsfeeds?: string ) {
    this.idnewsfeeds = idnewsfeeds;
    this.likes = likes;

    }
}