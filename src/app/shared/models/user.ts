export class User {
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
    withmeail?:    boolean;
    gender: string;

    constructor(
        firstName?:     string,
        lastName?:      string,
        birthday?:      Date,
        gender?: string,
        city?:          string,
        phoneNumber?:   string,
        email?:          string,
        password?:       string,
        withmeail?:    boolean,

        ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.birthday = birthday;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.withmeail = withmeail;
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
