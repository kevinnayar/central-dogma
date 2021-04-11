import * as React from 'react';

type Props = {
  length: number;
  width: number;
  height: number;
};

export function NucleicAcidIndicators(props: Props) {
  const indicators = new Array(props.length).fill(null).map((_, i) => i);
  const styles = { width: props.width, height: props.height, lineHeight: `${props.height}px` };
  return (
    <div className="indicators">
      {indicators.map((a, i) => (
        <div key={`${a}.${i}`} className="indicator" style={styles}>
          <i className="material-icons" style={styles}>
            south
          </i>
        </div>
      ))}
    </div>
  );
}
