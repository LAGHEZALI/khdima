export interface Post {
    uid?:               string;
    userUid:            string;
    title:              string;
    content?:           string;
    userPhotoURL?:      string;
    userDisplayName?:   string;
    dateCreated?:       Date;
    city?:              string;
    imagesUrls?:        string[];
    recordUrl?:         string;
}
