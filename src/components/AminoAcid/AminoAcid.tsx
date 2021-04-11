import * as React from 'react';
import { AminoAcidDef } from '../../../types/baseTypes';

type Props = {
  aminoAcid: AminoAcidDef;
  height: number;
  width: number;
};

export function AminoAcid(props: Props) {
  const styles = { width: props.width, minWidth: props.width, height: props.height };

  return (
    <div
      className={`amino-acid amino-acid__${props.aminoAcid.code.toLowerCase()}`}
      style={styles}
    >
      <div
        className="amino-acid__name"
        style={{ ...styles, height: props.height / 2, background: props.aminoAcid.color }}
      >
        <p>{props.aminoAcid.name}</p>
      </div>
      <div
        className="amino-acid__prop-type"
        style={{ ...styles, height: props.height / 2, background: props.aminoAcid.propColor }}
      >
        <p>{props.aminoAcid.propType}</p>
      </div>
    </div>
  );
}
