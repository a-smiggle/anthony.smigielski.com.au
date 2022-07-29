type Article = {
  id: number;
  created_at: string;
  title: string;
  excerpt: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  link: string;
  tags?: string;
  subTags?: string;
  pin: boolean;
  author: number;
};

export type { Article };
