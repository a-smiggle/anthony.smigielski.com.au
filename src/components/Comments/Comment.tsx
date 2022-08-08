import { Accordion, Button } from '@nextail/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import { CommentType } from '../../types/Comment';
import ActionButtons from './ActionButtons';

dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

const GET_USER = (id: string) => {
  const { data } = useSWR(id.toString(), async () =>
    Supabase.from('profiles').select('*').eq('id', id)
  );
  if (data && data.data) return data.data[0];
  return [];
};

interface Props {
  comment: CommentType;
}
export default function Comment({ comment }: Props) {
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const USER = comment ? GET_USER(comment.authorId) : [];
  const [reply, setReply] = useState(false);
  const [replyError, setReplyError] = useState(false);
  const [replyComment, setReplyComment] = useState('');

  const handleReplySubmit = async () => {
    if (user && typeof user !== 'boolean') {
      const newComment = {
        authorId: user.id,
        articleId: comment.articleId,
        content: replyComment,
        isApproved: true,
        isPublished: true,
        parentId: comment.id,
      };
      const { data, error } = await Supabase.from('comments').insert([
        newComment,
      ]);
      if (data) mutate('GET_ALL_COMMENTS');
      if (error) setReplyError(true);
    }
    setReply(false);
    setReplyComment('');
  };

  const handleReplyCancel = async () => {
    setReply(false);
    setReplyComment('');
  };

  const handleNewReply = () => {
    setReplyError(false);
    setReply(true);
  };

  return (
    <div className="flex w-full flex-col rounded border-2 border-slate-500 p-2 shadow hover:border-slate-900 hover:shadow-lg dark:border-slate-300 dark:hover:border-slate-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="capitalize">{USER.full_name}</h3>
          <a className="pl-2 text-xs font-light leading-none text-gray-400">
            {dayjs().diff(comment.createdAt, 'seconds', true) < 30
              ? 'just now'
              : `- ${dayjs(comment.createdAt).fromNow()}`}
          </a>
        </div>
        {user && !reply ? (
          <Button
            onClick={() => handleNewReply()}
            mainStylings={{
              className:
                'text-lg border border-transparent hover:border-b-black hover:dark:border-b-slate-300 px-2',
            }}
          >
            Reply
          </Button>
        ) : null}
      </div>
      <p className={`px-2 pb-2 ${reply ? 'italic' : ''}`}>{comment.content}</p>
      {reply ? (
        <div className="pl-4">
          <div className="flex justify-between">
            <h3 className="pb-4 text-left">Leave Reply</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => handleReplyCancel()}
                mainStylings={{
                  className:
                    'justify-center border border-red-500 rounded px-4 flex gap-2 items-center text-lg font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300 active:scale-90',
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleReplySubmit()}
                mainStylings={{
                  className:
                    'justify-center border border-emerald-500 rounded px-4 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                }}
              >
                Confirm
              </Button>
            </div>
          </div>

          <form>
            <div className="grid grid-cols-1 gap-6 pb-4">
              <label className="block">
                <textarea
                  placeholder="Enter reply here."
                  className="mt-1 block w-full rounded border-2 border-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
                  rows={3}
                  value={replyComment}
                  onChange={(e) => {
                    setReplyComment(e.target.value);
                  }}
                />
              </label>
            </div>
          </form>
        </div>
      ) : null}
      {replyError && !reply ? (
        <p className="text-red-500">Error submitting reply. Try again.</p>
      ) : null}
      <ActionButtons comment={comment} />
      {comment.responses && comment.responses?.length > 0 && (
        <Accordion
          flush
          mainStylings={{ spacing: { padding: ' ' } }}
          titleStylings={{
            border: { borderWidth: ' ' },
            spacing: { padding: 'px-2 pb-2' },
          }}
          titleActiveStylings={{
            border: { borderWidth: ' ' },
            spacing: { padding: 'px-2 pb-2' },
          }}
          data={[
            {
              title: `${comment.responses?.length} replies`,
              content: comment.responses?.map((response: CommentType) => (
                <div key={response.id} className="pl-4">
                  <Comment comment={response} />
                </div>
              )),
            },
          ]}
        />
      )}
    </div>
  );
}
