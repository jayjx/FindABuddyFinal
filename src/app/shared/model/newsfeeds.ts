export class Newsfeeds {
    title: string;
    caption: string;
    picture: string;
    create_date: string;
    edit_date: string;
    idnewsfeeds: string;
    userid: string;
    likes : string

    constructor(title:string, caption:string, picture:string, create_date:string, edit_date:string, likes:string,userid? : string,idnewsfeeds?: string ) {
    this.title = title;
    this.caption = caption;
    this.picture = picture;
    this.create_date = create_date;
    this.edit_date = edit_date;
    this.likes = likes;
    this.userid = userid;
    this.idnewsfeeds = idnewsfeeds;

    }
}