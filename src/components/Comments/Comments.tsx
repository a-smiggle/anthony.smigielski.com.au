import { arrayToTree } from 'performant-array-to-tree';
import React from 'react';
import useSWR from 'swr';

import Supabase from '../../lib/Supabase';
import { CommentType } from '../../types/Comment';
import Comment from './Comment';

const GET_ALL = (id: number) => {
  const { data } = useSWR('GET_ALL_COMMENTS', async () =>
    Supabase.from('comments')
      .select('*', { count: 'exact' })
      .eq('articleId', id)
  );

  if (data && data.data) {
    const flattenedComments: CommentType[] = data ? data.data.flat() : [];

    const comments: CommentType[] = data
      ? (arrayToTree(flattenedComments, {
          dataField: null,
          childrenField: 'responses',
        }) as CommentType[])
      : [];

    return { comments, count: data.count };
  }
  return { comments: undefined, count: undefined };
};
/*
const GET_RANGE = (id: number, start: number, stop: number) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('comments').select('*').eq('articleId', id).range(start, stop)
  );
  if (data && data.data) return data.data;
  return [];
};

const GET_BASE_COUNT = (id: number) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('comments')
      .select('count', { count: 'exact' })
      .eq('articleId', id)
      .is('parentId', null)
  );
  if (data && data.count) return data.count;
  return 0;
};
const GET_BASE = (id: number) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('comments')
      .select('*')
      .eq('articleId', id)
      .is('parentId', null)
  );
  if (data && data.data) return data.data;
  return [];
};

const GET_BASE_RANGE = (id: number, start: number, stop: number) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('comments')
      .select('*')
      .eq('articleId', id)
      .is('parentId', null)
      .range(start, stop)
  );
  if (data && data.data) return data.data;
  return [];
};

const GET_REPLY = (id: number, parentId) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('comments').select('*').match({ articleId: id, parentId })
  );
  if (data && data.data)
    return {
      parents: data.data.filter((comment: CommentType) => !comment.parentId),
      children: data.data.filter((comment: CommentType) => comment.parentId),
    };
  return undefined;
};
*/
export default function Comments({ id }: { id: number }) {
  const COMMENTS = id ? GET_ALL(id) : { comments: undefined, count: undefined };
  return (
    <div className="flex w-full flex-col gap-2">
      {COMMENTS?.comments?.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
