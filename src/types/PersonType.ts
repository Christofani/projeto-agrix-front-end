 // Supondo que Role já esteja tipado em outro arquivo
import { Farm } from "./FarmType"; // Supondo que Farm já esteja tipado em outro arquivo

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