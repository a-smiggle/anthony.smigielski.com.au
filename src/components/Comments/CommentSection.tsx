import { Button } from '@nextail/core';
import React, { Fragment, useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { useSWRConfig } from 'swr';

import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import Comments from './Comments';

export default function CommentSection({ id }: { id: number }) {
  const { user } = useUser();
  const { mutate } = useSWRConfig();
  const [newCommentValue, setNewCommentValue] = useState('');
  const [newCommentError, setNewCommentError] = useState(false);
  const [newComment, setNewComment] = useState(false);

  const handleSubmit = async () => {
    if (user && typeof user !== 'boolean') {
      const comment = {
        authorId: user.id,
        articleId: id,
        content: newCommentValue,
        isApproved: true,
        isPublished: true,
      };
      const { data, error } = await Supabase.from('comments').insert([comment]);
      if (data) mutate('GET_ALL_COMMENTS');
      if (error) setNewCommentError(true);
    }
    setNewComment(false);
    setNewCommentValue('');
  };

  const handleCancel = async () => {
    setNewCommentValue('');
    setNewComment(false);
  };

  const handleNewCommentPress = () => {
    setNewCommentError(false);
    setNewComment(true);
  };

  return (
    <section className="flex h-full flex-col px-4 pb-8 pt-4">
      <div className="flex flex-col justify-center md:flex-row">
        <div className="flex flex-col justify-between text-center md:w-1/6">
          <div className="md:sticky md:top-32">
            {user ? (
              <Fragment>
                <Button
                  mainStylings={{
                    className:
                      'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                  }}
                  onClick={() => Supabase.auth.signOut()}
                >
                  Log out
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <h2>Sign in to leave a comment.</h2>
                <Button
                  mainStylings={{
                    className:
                      'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                  }}
                  link="/auth/login"
                >
                  <AiFillUnlock /> Sign In
                </Button>
              </Fragment>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col md:w-3/4 md:px-4">
          <div className="sticky top-16 flex flex-col bg-white py-2 dark:bg-slate-800">
            <div className="flex flex-col md:flex-row md:justify-between">
              <h1 className="pb-4">Comments</h1>
              {user ? (
                <div>
                  <Button
                    onClick={() => handleNewCommentPress()}
                    mainStylings={{
                      className:
                        'text-lg border border-transparent hover:border-b-black hover:dark:border-b-slate-300 px-2',
                    }}
                  >
                    Leave Comment
                  </Button>
                </div>
              ) : null}
            </div>
            {newComment ? (
              <form>
                <div className="grid grid-cols-1 gap-6 pb-4">
                  <label className="block">
                    <textarea
                      placeholder="Enter comment here."
                      className="mt-1 block w-full rounded border-2 border-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
                      rows={3}
                      value={newCommentValue}
                      onChange={(e) => {
                        setNewCommentValue(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button
                    mainStylings={{
                      className:
                        'w-full justify-center border border-red-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300 active:scale-90',
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    mainStylings={{
                      className:
                        'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            ) : null}
            {newCommentError ? (
              <div className="flex justify-end">
                <p className="text-red-500">
                  Failed to submit comment try again
                </p>
              </div>
            ) : null}
          </div>
          <Comments id={id} />
        </div>
        <div className="w-0 lg:w-1/6"></div>
      </div>
    </section>
  );
}
