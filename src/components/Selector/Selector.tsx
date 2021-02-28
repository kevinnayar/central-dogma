import * as React from 'react';
import { TranslationFramesResult } from '../../../types/baseTypes';

export function Selector(props: { title: string, frames: TranslationFramesResult }) {
  return (
    <div className="selector">
      <div className="selector__section">
        <div className="selector__section__header">
          <h3 className="selector__section__header-item">{props.title}</h3>
        </div>
        <div className="selector__section__body">
          <div className="selector__section__body-frames">
            {props.frames.map((f, i) => (
              <div key={`${f}.${i}`} className="frame">
                <h4>Frame {i + 1}</h4>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

