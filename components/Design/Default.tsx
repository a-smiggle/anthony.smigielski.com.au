import React, { Fragment } from 'react';

function Default() {
  return (
    <Fragment>
      <div className="grid gap-2 pt-8 md:grid-cols-2">
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-black"></div>

            <div className="flex flex-col text-right">
              <h4>text-black</h4>
              <h4>#000000</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-slate-300"></div>

            <div className="flex flex-col text-right">
              <h4>text-slate-300</h4>
              <h4>#cbd5e1</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-emerald-500"></div>
            <div className="flex flex-col text-right">
              <h4>text-emerald-500</h4>
              <h4>#10B981</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-emerald-500"></div>
            <div className="flex flex-col text-right">
              <h4>text-emerald-500</h4>
              <h4>#10B981</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-white"></div>
            <div className="flex flex-col text-right">
              <h4>text-white</h4>
              <h4>#ffffff</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-slate-800"></div>
            <div className="flex flex-col text-right">
              <h4>bg-slate-800</h4>
              <h4>#1e293b</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Default;
