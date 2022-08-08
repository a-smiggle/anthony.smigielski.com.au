import { Button } from '@nextail/core';
import React from 'react';
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs';
import useSWR, { useSWRConfig } from 'swr';

import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import { CommentType } from '../../types/Comment';
import { CommentVotes } from '../../types/CommentVotes';

const GET_VOTES = (comment: CommentType) => {
  const { data } = useSWR(`Votes: ${comment.id.toString()}`, async () =>
    Supabase.from('comment_votes').select('*').eq('commentId', comment.id)
  );
  if (data && data.data) {
    return data.data;
  }
  return undefined;
};

export default function ActionButtons({ comment }: { comment: CommentType }) {
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const votes: CommentVotes[] | undefined = GET_VOTES(comment);

  const HandleVote = async (value: number) => {
    const { data } = await Supabase.from('comment_votes').upsert(
      [{ commentId: comment.id, userId: user?.id, value }],
      {
        onConflict: 'commentId, userId',
      }
    );
    if (data) mutate(`Votes: ${comment.id.toString()}`);
  };

  const UserThumbsUp = () => {
    if (
      votes
        ?.filter((vote) => vote.value > 0)
        .find((vote) => vote.userId === user?.id)
    )
      return (
        <BsHandThumbsUpFill
          onClick={() => HandleVote(0)}
          className="fill-emerald-500 hover:fill-slate-300"
        />
      );
    return (
      <BsHandThumbsUp
        onClick={() => HandleVote(1)}
        className="hover:text-emerald-500"
      />
    );
  };

  const UserThumbsDown = () => {
    if (
      votes
        ?.filter((vote) => vote.value < 0)
        .find((vote) => vote.userId === user?.id)
    )
      return (
        <BsHandThumbsDownFill
          onClick={() => HandleVote(0)}
          className="fill-red-500 hover:fill-slate-500"
        />
      );
    return (
      <BsHandThumbsDown
        onClick={() => HandleVote(-1)}
        className="hover:text-red-500"
      />
    );
  };

  return (
    <div className="flex flex-row items-center gap-2 px-2 pb-2">
      <Button mainStylings={{ className: ' ' }}>
        {user ? UserThumbsUp() : <BsHandThumbsUp title="Login to vote" />}
      </Button>
      <span>{votes?.filter((vote) => vote.value > 0).length}</span>
      <Button mainStylings={{ className: ' ' }}>
        {user ? UserThumbsDown() : <BsHandThumbsDown title="Login to vote" />}
      </Button>
      <span>{votes?.filter((vote) => vote.value < 0).length}</span>
    </div>
  );
}
