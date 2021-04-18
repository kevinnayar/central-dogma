import * as React from 'react';
import { Section } from '../../components/Section/Section';
import { NucleicAcidSequence } from '../../components/NucleicAcidSequence/NucleicAcidSequence';
import { NucleicAcidIndicators } from '../../components/NucleicAcidIndicators/NucleicAcidIndicators';
import { AminoAcidSequence } from '../../components/AminoAcidSequence/AminoAcidSequence';
import { AminoAcidDef } from '../../../types/baseTypes';

type Props = {
  orf: null | string,
  aminoAcidDefs: null | AminoAcidDef[];
  width: number;
  height: number;
};

function PolypeptideBody(props: Props) {
  return (
    <div className="polypeptide-section">
      <h4>DNA {'->'} Amino Acid Chain</h4>
      <div className="section__panel">
        <NucleicAcidSequence
          sequence={props.orf}
          type="rna"
          width={props.width}
          height={props.height}
        />
        <NucleicAcidIndicators
          length={props.orf.length / 3}
          width={props.width * 3}
          height={props.height}
        />
        <AminoAcidSequence
          aminoAcids={props.aminoAcidDefs}
          width={props.width * 3}
          height={props.height * 2}
        />
      </div>
    </div>
  );

}

export function PolypeptideSection(props: Props) {
  const title = 'Polypeptide: Chain of Amino Acids';
  const subtitle = 'During Translation, the mRNA strand is translated to a chain of amino acids which eventually folds into a protein.';
  const variant = 'dark';
  return (
    <Section title={title} subtitle={subtitle} variant={variant}>
      {props.orf && props.aminoAcidDefs && <PolypeptideBody {...props} />}
    </Section>
  );
}
