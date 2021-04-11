import * as React from 'react';

export function Button(props: {
  text: string;
  onClick: (e: any) => void;
}) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
