import * as React from 'react';
import { useState, useEffect } from 'react';
import { Section } from '../../components/Section/Section';
import { Button } from '../../components/Button/Button';

type DNAProps = {
  dna: string;
  setDna: (dna: string) => void;
};

function DNABody(props: DNAProps) {
  const [dna, setDna] = useState(props.dna);

  const updateSequence = (e: any) => {
    e.preventDefault();
    setDna(e.target.value);
  };

  const commitSequence = (e: any) => {
    e.preventDefault();
    props.setDna(dna);
  };

  useEffect(() => {
    if (props.dna !== dna) setDna(props.dna);
  }, [props.dna]);

  return (
    <div className="dna-section">
      <label>DNA Template Strand</label>
      <textarea value={dna} onChange={updateSequence} />
      <Button text="Update" onClick={commitSequence} />
    </div>
  );
}

export function DNASection(props: DNAProps) {
  const title = 'DNA: Deoxyribonucleic acid';
  const subtitle =
    'The molecule that contains the biological instructions that make each species unique.';
  const variant = 'dark';

  return (
    <Section title={title} subtitle={subtitle} variant={variant}>
      <DNABody {...props} />
    </Section>
  );
}