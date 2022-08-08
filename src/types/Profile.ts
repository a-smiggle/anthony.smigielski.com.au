type Profile = {
  id: string;
  created_at: string;
  updated_at?: string;
  full_name: string;
  avatar_url?: string;
  admin: boolean;
};

export type { Profile };
