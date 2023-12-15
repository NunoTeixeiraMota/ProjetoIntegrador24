export interface User {
    token?(token: any): unknown;
    id?:string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
  }
  