export interface User {
    uid?:           string;
    email:          string;
    password:       string;
    phoneNumber?:   string;
    photoURL?:      string;
    firstName?:     string;
    lastName?:      string;
    city?:          string;
    birthday?:      Date;
    worker?:        boolean;
    client?:        boolean;
}
