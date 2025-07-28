import React from 'react';

export default function Title({ children }) {
  return (
    <div>
      <div className="h-px bg-slate-400 dark:bg-slate-500 my-1" />
      <h2 className='title' data-aos="zoom-out">{children}</h2>
      <div className="h-px bg-slate-400 dark:bg-slate-500 my-1" />
    </div>
  );
}
