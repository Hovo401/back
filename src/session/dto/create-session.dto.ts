export class CreateSessionDto {
    title: string;
    content: string;
    authorId: number;
    descriptions?: string | null;
    price?: number;
    duration?: number | null;
    Videos?: string;
}
