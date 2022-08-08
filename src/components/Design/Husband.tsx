import React, { Fragment } from 'react';

function Husband() {
  return (
    <Fragment>
      <div className="grid gap-2 pt-8 md:grid-cols-2 md:grid-rows-2">
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-orange-700"></div>
            <div className="flex flex-col text-right">
              <h4>text-orange-700</h4>
              <h4>#c2410c</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Text Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-orange-300"></div>
            <div className="flex flex-col text-right">
              <h4>text-orange-300</h4>
              <h4>#fdba74</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-red-100"></div>
            <div className="flex flex-col text-right">
              <h4>border-red-100</h4>
              <h4>#fee2e2</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Border/Accent Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-orange-400"></div>
            <div className="flex flex-col text-right">
              <h4>border-orange-400</h4>
              <h4>#fb923c</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-red-300"></div>
            <div className="flex flex-col text-right">
              <h4>bg-red-300</h4>
              <h4>#fca5a5</h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded border bg-white p-2 text-black dark:bg-slate-900 dark:text-slate-300">
          <h3 className="pb-4">Background Dark</h3>
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded border-2 border-black bg-red-900"></div>
            <div className="flex flex-col text-right">
              <h4>bg-red-900</h4>
              <h4>#7f1d1d</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Husband;
