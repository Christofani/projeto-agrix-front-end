import { Farm } from "./FarmType";

export interface User {
  personId: number;
  username: string;
  role: string;
  farms: Farm[];
}
