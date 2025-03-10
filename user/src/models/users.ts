export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  subscribeToNewsletter: boolean;
}

export const users: User[] = [];
