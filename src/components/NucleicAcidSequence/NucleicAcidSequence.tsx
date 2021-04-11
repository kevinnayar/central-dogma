import * as React from 'react';
import { NucleicAcidBase } from '../NucleicAcidBase/NucleicAcidBase';
import { BaseSymbol } from '../../../types/baseTypes';

type Props = {
  type: 'dna' | 'rna';
  sequence: string;
  width: number;
  height: number;
};

export function NucleicAcidSequence(props: Props) {
  return (
    <div className="sequence">
      {[...props.sequence].map((s, i) => {
        const base = s as BaseSymbol;
        return (
          <NucleicAcidBase
            key={`${i}.${s}`}
            base={base}
            type={props.type}
            width={props.width}
            height={props.height}
          />
        );
      })}
    </div>
  );
}
