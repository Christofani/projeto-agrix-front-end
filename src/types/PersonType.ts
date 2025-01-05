import { Farm } from "./FarmType"; 

export interface Person {
  personId: number;
  username: string;
  role: "ADMIN" | "MANAGER" | "USER" ;
  farms: Farm[];
}

export interface PersonInfoDto {
  personId: number;
  username: string;
}