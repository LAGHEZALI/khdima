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
        uid: string,
        userUid: string,
        title: string,
        category: string,
        content: string,
        userPhotoURL: string,
        userDisplayName: string,
        dateCreated: Number,
        city: string,
        imagesUrls:  string[],
        recordUrl: string) {
            this.uid = uid;
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
}
