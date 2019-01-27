export class Bid {
    price?:             string;
    delay?:             string;
    comment?:           string;
    postId?:            string;
    createdAt?:         Object;
    userUid?:           string;
    userDisplayName?:   string;
    state?:             string;
    userImageUrl?:     string;

    constructor (
        price:             string,
        delay:             string,
        comment:           string,
        postId:            string,
        createdAt:         Object,
        state:             string,
        userUid:           string,
        userDisplayName:   string,
        userImageUrl:     string
    ) {
        this.price = price;
        this.delay = delay;
        this.comment = comment;
        this.postId = postId;
        this.createdAt = createdAt;
        this.state = state;
        this.userUid = userUid;
        this.userDisplayName = userDisplayName;
        this.userImageUrl = userImageUrl;
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
