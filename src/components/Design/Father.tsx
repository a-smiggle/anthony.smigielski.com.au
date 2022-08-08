import React, { Fragment } from 'react';

function Father() {
  return (
    <Fragment>
      <div className="grid gap-2 pt-8 md:grid-cols-2 md:grid-rows-2">
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-red-200"></div>
            <div className="flex flex-col text-right">
              <h4>text-red-200</h4>
              <h4>#fecaca</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-orange-400"></div>
            <div className="flex flex-col text-right">
              <h4>text-orange-400</h4>
              <h4>#f87171</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-red-100"></div>
            <div className="flex flex-col text-right">
              <h4>text-red-100</h4>
              <h4>#fee2e2</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-orange-400"></div>
            <div className="flex flex-col text-right">
              <h4>text-orange-400</h4>
              <h4>#f87171</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-pink-400"></div>
            <div className="flex flex-col text-right">
              <h4>bg-pink-400</h4>
              <h4>#f472b6</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-pink-900"></div>
            <div className="flex flex-col text-right">
              <h4>bg-pink-900</h4>
              <h4>#831843</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Father;
