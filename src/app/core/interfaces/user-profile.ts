export interface UserProfile {
  id: number;
  email: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  verificationCode: string;
  verificationExpiration: string; // ou Date si tu veux le parser
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  authorities: string[]; // ou autre type si tu as un rôle précis
  accountNonLocked: boolean;
}