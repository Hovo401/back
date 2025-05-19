export class CreateSessionDto {
    fullName: string;
    content: string;
    authorId:  number;
    about?:    string;
    skills?:    string;
    experience?: string;
    education?: string;
    languages?: string;
    price?:     number;
    rating?:    number;
    videoUrl?: string;
}
