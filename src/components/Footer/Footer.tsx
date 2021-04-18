import * as React from 'react';

export function Footer(props: { text: string }) {
  return (
    <footer className="footer">
      <p className="footer__text">{props.text}</p>
    </footer>
  );
}
