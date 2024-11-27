import { IsEmail, IsEnum, IsInt, IsNotEmpty, Matches, IsString, IsOptional, IsDate, ValidateIf } from "class-validator";
import { Type } from 'class-transformer';

import { Role } from "../enums/role.enum";

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export class AuthCredentialsDto {

  // @IsEmail({}, { message: "Please provide a valid email address" })
  // email: string; // Updated to `email` to match the user schema

  @ValidateIf((o) => !o.username || o.username.includes('@')) // Checks if username contains '@' to validate as email
  @IsEmail({}, { message: "Username must be a valid email if it contains '@'" })
  @IsString({ message: "Username must be a string" })
  username: string; // Can be either an email or a regular string

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional() // Gender is optional
  @IsString()
  gender: string;

  @IsOptional() // Date of Birth is optional
  @Type(() => Date) // Converts the input to a Date object
  @IsDate({ message: "Date of Birth must be a valid date" })
  dob?: Date;
  
  @IsOptional()
  @IsInt()
  phone: number;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 6 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
  })
  password: string;

  isActive: boolean;

  @IsNotEmpty()
  //@IsEnum(Role)
  role: Role;
}
