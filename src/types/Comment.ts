type CommentType = {
  id: number;
  articleId: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  isPublished: boolean;
  authorId: string;
  parentId?: string;
  isPinned?: boolean;
  isDeleted?: boolean;
  isApproved?: boolean;
  responses?: CommentType[];
};

export type { CommentType };
