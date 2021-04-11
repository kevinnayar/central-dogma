import * as React from 'react';
import { AminoAcid } from '../AminoAcid/AminoAcid';
import { AminoAcidDef } from '../../../types/baseTypes';

type Props = {
  aminoAcids: AminoAcidDef[];
  height: number;
  width: number;
};

export function AminoAcidSequence(props: Props) {
  return (
    <div className="amino-acids">
      {props.aminoAcids.map((aminoAcid, i) => {
        return (
          <AminoAcid
            key={`${i}.${aminoAcid.code}`}
            width={props.width}
            height={props.height}
            aminoAcid={aminoAcid}
          />
        );
      })}
    </div>
  );
}
