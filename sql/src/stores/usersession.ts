import { defineStore } from 'pinia';

interface SessionState {
  session: Session | null;
}
interface Session {
  user: User | null;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
}

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    f_name: string;
    grade: number;
    l_name: string;
    osis: number;
    phone_verified: boolean;
    sub: string;
    username: string;
  };
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    f_name: string;
    grade: number;
    l_name: string;
    osis: number;
    phone_verified: boolean;
    sub: string;
    username: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export const useSessionStore = defineStore('usersession', {
  state: (): SessionState => ({
    session: null,
  }),
});