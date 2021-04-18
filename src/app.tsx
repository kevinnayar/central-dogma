import * as React from 'react';
import { useState } from 'react';
import {
  transcribeDnaToRna,
  getAllOpenReadingFrames,
  getLongestORF,
  translateRnaSequenceToPolypeptide,
  getAminoAcidDef,
} from '../utils/baseUtils';
import { AminoAcidDef } from '../types/baseTypes';

import { Header } from './components/Header/Header';
import { DNASection } from './sections/DNA/DNA';
import { RNASection } from './sections/RNA/RNA';
import { PolypeptideSection } from './sections/Polypeptide/Polypeptide';

const seedTemplateDNA = [
  'TACAAAAAGAATAACAGAAGGAGTAGCATAATGACAACGACCGAAGAG',
  'GATGACGGAGGGGGTGGCGTAGTGGTTGTCGCAGCGGCTGCCTAATAG',
  'TATTGATGGTGTTGCTTATTGTTTTTCTCATCGTCTTCCCAACAGCAT',
  'CACCGACGGCGTCGCCTACTGCTTCTCCCACCGCCTCCCATTATCACT',
].join('');

function getOrf(dna: string): string {
  const orfList = getAllOpenReadingFrames(dna, 'dna');
  if (orfList.every(o => o.length === 0)) throw new Error('This sequence does not contain both a start and at least one stop codon.');
  const orf = getLongestORF(orfList);
  return orf;
}

export default function App() {
  const width = 36;
  const height = 36;

  const [dna, setDna] = useState(seedTemplateDNA);
  const [rna, setRna] = useState(transcribeDnaToRna(dna));

  const [orf, setOrf] = useState<null | string>(null);
  const [aminoAcidDefs, setAminoAcidDefs] = useState<AminoAcidDef[]>([]);
  const [error, setError] = useState<null | string>(null);

  const transcribeAndTranslate = (newDna: string) => {
    setDna(newDna);

    const newRna = transcribeDnaToRna(newDna);
    setRna(newRna);

    try {
      setError(null);

      const newOrf = getOrf(dna);
      setOrf(newOrf);

      const { polypeptide } = translateRnaSequenceToPolypeptide(newOrf, [], 'dna');

      const newAminoAcidDefs = polypeptide.map(getAminoAcidDef);
      setAminoAcidDefs(newAminoAcidDefs);
    } catch (e) {
      setError(e.toString());
    }
  }

  return (
    <div className="app">
      <Header title="🧬 The Central Dogma of Molecular Biology" />
      <div className="sections">
        <DNASection dna={dna} setDna={transcribeAndTranslate} />
        <RNASection dna={dna} rna={rna} width={width} height={height} />
        {error && <div className="section section--error"><p>{error}</p></div>}
        {orf && aminoAcidDefs && <PolypeptideSection orf={orf} aminoAcidDefs={aminoAcidDefs} width={width} height={height} />}
      </div>
      <footer className="footer"></footer>
    </div>
  );
}
