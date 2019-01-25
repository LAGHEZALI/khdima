export class Post {
    uid?:               string;
    userUid:            string;
    title:              string;
    category:           string;
    content?:           string;
    userPhotoURL?:      string;
    userDisplayName?:   string;
    dateCreated?:       Number;
    city?:              string;
    imagesUrls?:        string[];
    recordUrl?:         string;

    constructor(
        title: string,
        category: string,
        content: string,
        city: string) {
            
            this.title = title;
            this.category = category;
            this.content = content;
           
            this.city = city;
           
    }

    toJson(): string {
        return JSON.stringify(this, null, '  ');
    }
}
