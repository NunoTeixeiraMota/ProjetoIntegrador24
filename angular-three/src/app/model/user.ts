type UserError = {
  code: string;
  description: string;
};

export interface User {
  token?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phonenumber?: string;
  error?: UserError[];
}
