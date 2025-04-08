import { $Enums } from "@prisma/client";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  roles?: $Enums.Role ;
  gender?: $Enums.Gender ;
  age?: number ;
  aboutMe?: string ;
  birthday?: Date ;
}