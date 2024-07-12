export interface IProfileImage {
    originalname: string
    name: string,
    path: string,
}

interface IUser {
    _id: number,
    name: string,
    profile: IProfileImage,
}

export interface IReply {
    content: string,
    user: IUser,
    _id: string,
    createdAt : string,
    updatedAt : string,
}

export interface ILogin {
    email: string,
    password: string,
}

export interface ISignup extends ILogin {
    name: string,
    type: string,
    profileImage?: IProfileImage,
}
