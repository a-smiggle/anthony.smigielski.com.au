import React, { Fragment } from 'react';

function Gardener() {
  return (
    <Fragment>
      <div className="grid gap-2 pt-8 md:grid-cols-2 md:grid-rows-2">
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-700"></div>
            <div className="flex flex-col text-right">
              <h4>text-amber-700</h4>
              <h4>#b45309</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-300"></div>
            <div className="flex flex-col text-right">
              <h4>text-amber-300</h4>
              <h4>#fcd34d</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-900"></div>
            <div className="flex flex-col text-right">
              <h4>text-amber-900</h4>
              <h4>#78350f</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-400"></div>
            <div className="flex flex-col text-right">
              <h4>text-amber-400</h4>
              <h4>#fbbf24</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-400"></div>
            <div className="flex flex-col text-right">
              <h4>bg-amber-400</h4>
              <h4>#fbbf24</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-amber-900"></div>
            <div className="flex flex-col text-right">
              <h4>bg-amber-900</h4>
              <h4>#78350f</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Gardener;
