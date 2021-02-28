import * as React from 'react';

export function Header(props: { title: string }) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

