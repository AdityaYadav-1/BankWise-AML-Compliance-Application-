export interface Role {
  authority: string;
}

export interface User {
  id: number;
  username: string;
  roles: Role[];
  enabled: boolean;
}
