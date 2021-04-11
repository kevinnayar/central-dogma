import * as React from 'react';
import { Section } from '../../components/Section/Section';
import { NucleicAcidSequence } from '../../components/NucleicAcidSequence/NucleicAcidSequence';
import { NucleicAcidIndicators } from '../../components/NucleicAcidIndicators/NucleicAcidIndicators';
import { AminoAcidSequence } from '../../components/AminoAcidSequence/AminoAcidSequence';
import { AminoAcidDef } from '../../../types/baseTypes';

type Props = {
  orf: string,
  aminoAcidDefs: AminoAcidDef[];
  width: number;
  height: number;
};

function PolypeptideBody(props: Props) {
  return (
    <div className="polypeptide-section">
      <h4>mRNA {'->'} Amino Acid Chain</h4>
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
  const title = 'Polypeptide';
  const subtitle = 'During Translation, the mRNA trand is transllated to a chain of amino acids which will eventually folld into a protein.';
  const variant = 'light';
  return (
    <Section title={title} subtitle={subtitle} variant={variant}>
      <PolypeptideBody {...props} />
    </Section>
  );
}
