export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TEACHER';
  avatar?: string;
}