import * as React from 'react';
import { getBaseName, getBaseColor } from '../../../utils/baseUtils';
import { BaseSymbol } from '../../../types/baseTypes';

type Props = {
  type: 'dna' | 'rna';
  base: BaseSymbol;
  width: number;
  height: number;
};

export function NucleicAcidBase(props: Props) {
  const name = getBaseName(props.base);
  const backgroundColor = getBaseColor(props.base);
  const styles = {
    width: props.width,
    minWidth: props.width,
    height: props.height,
    backgroundColor,
  };

  return (
    <div
      className={`base base__${props.type} base__${props.base.toLowerCase()}`}
      style={styles}
    >
      <p className="base__symbol">{props.base}</p>
    </div>
  );
}

