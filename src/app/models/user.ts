export class User {
    
    private constructor(
        public id: number,
        public name: string,
        public username: string,
        public email: string,
        public avatar: string,
        public postLike: Boolean[]
    ) { }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.name,
            json.username,
            json.email,
            json.avatar,
            json.postLike
        );
    }

    static defaultUser(): User {
        return new User(
            1,
            "KeepCoder",
            "keepcoder",
            "keepcoder@postium.com",
            "assets/images/keepcoder.jpg",
            [    ]
        )
    }
}
