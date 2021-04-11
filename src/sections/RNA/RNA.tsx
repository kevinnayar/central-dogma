import * as React from 'react';
import { Section } from '../../components/Section/Section';
import { NucleicAcidSequence } from '../../components/NucleicAcidSequence/NucleicAcidSequence';
import { NucleicAcidIndicators } from '../../components/NucleicAcidIndicators/NucleicAcidIndicators';

type RNAProps = {
  dna: string;
  rna: string;
  width: number;
  height: number;
};

function RNABody(props: RNAProps) {
  return (
    <div className="rna-section">
      <h4>DNA {'->'} mRNA</h4>
      <div className="section__panel">
        <NucleicAcidSequence
          sequence={props.dna}
          type="dna"
          width={props.width}
          height={props.height}
        />
        <NucleicAcidIndicators
          length={props.dna.length}
          width={props.width}
          height={props.height}
        />
        <NucleicAcidSequence
          sequence={props.rna}
          type="rna"
          width={props.width}
          height={props.height}
        />
      </div>
    </div>
  );
}

export function RNASection(props: RNAProps) {
  const title = 'RNA: Ribonucleic acid';
  const subtitle = 'Via the process of Transcription, a segment of DNA is transcribed into an mRNA strand.';
  const variant = 'light';

  return (
    <Section title={title} subtitle={subtitle} variant={variant}>
      <RNABody { ...props } />
    </Section>
  );
}


