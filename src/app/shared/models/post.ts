import { Bid } from './bid';

export class Post {
    id?:               string;
    userUid:            string;
    title:              string;
    category:           string;
    content?:           string;
    userPhotoURL?:      string;
    userDisplayName?:   string;
    dateCreated?:       Object;
    city?:              string;
    imagesUrls?:        string[];
    recordUrl?:         string;
    bids?:              Bid[];

    constructor(
        id: string,
        userUid: string,
        title: string,
        category: string,
        content: string,
        userPhotoURL: string,
        userDisplayName: string,
        dateCreated: Object,
        city: string,
        imagesUrls:  string[],
        recordUrl: string) {
            this.id = id;
            this.userUid = userUid;
            this.title = title;
            this.category = category;
            this.content = content;
            this.userPhotoURL = userPhotoURL;
            this.userDisplayName = userDisplayName;
            this.dateCreated = dateCreated;
            this.city = city;
            this.imagesUrls = imagesUrls;
            this.recordUrl = recordUrl;
    }

    toJson(): string {
        return JSON.stringify(this, null, '  ');
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
