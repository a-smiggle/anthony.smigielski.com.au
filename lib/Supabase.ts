import { createClient } from '@supabase/supabase-js';

const Supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

type Article = {
  id: number;
  created_at: string;
  title: string;
  excerpt: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  link: string;
  tags: string;
  pin: boolean;
};

export type { Article };
export default Supabase;
