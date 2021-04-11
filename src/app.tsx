import * as React from 'react';
import { useState } from 'react';
import {
  transcribeDnaToRna,
  getAllOpenReadingFrames,
  getLongestORFIndex,
  translateRnaSequenceToPolypeptide,
  getAminoAcidDef,
} from '../utils/baseUtils';

import { Header } from './components/Header/Header';
import { DNASection } from './sections/DNA/DNA';
import { RNASection } from './sections/RNA/RNA';
import { ORFsSection } from './sections/ORFs/ORFs';
import { PolypeptideSection } from './sections/Polypeptide/Polypeptide';

const seedTemplateDNA = [
  'TACAAAAAGAATAACAGAAGGAGTAGCATAATGACAACGACCGAAGAG',
  'GATGACGGAGGGGGTGGCGTAGTGGTTGTCGCAGCGGCTGCCTAATAG',
  'TATTGATGGTGTTGCTTATTGTTTTTCTCATCGTCTTCCCAACAGCAT',
  'CACCGACGGCGTCGCCTACTGCTTCTCCCACCGCCTCCCATTATCACT',
].join('');

export default function App() {
  const width = 36;
  const height = 36;

  const [dna, setDna] = useState(seedTemplateDNA);
  const [rna, setRna] = useState(transcribeDnaToRna(dna));

  const [orfList, setOrfList] = useState(getAllOpenReadingFrames(rna));
  const orfIndex = getLongestORFIndex(orfList);
  const [orf, setOrf] = useState(orfList[orfIndex]);
  
  const { polypeptide } = translateRnaSequenceToPolypeptide(orf);
  const [aminoAcidDefs, setAminoAcidDefs] = useState(polypeptide.map(getAminoAcidDef));

  const transcribe = (updatedDna: string) => {
    setDna(updatedDna);

    const updatedRna = transcribeDnaToRna(updatedDna);
    setRna(updatedRna);

    const updatedOrfList = getAllOpenReadingFrames(updatedRna);
    setOrfList(updatedOrfList);
  };

  const translate = (updatedOrf: string) => {
    setOrf(updatedOrf);

    const { polypeptide: updatedPolypeptide } = translateRnaSequenceToPolypeptide(updatedOrf);
    setAminoAcidDefs(updatedPolypeptide.map(getAminoAcidDef));
  }

  return (
    <div className="app">
      <Header title="🧬 The Central Dogma of Molecular Biology" />
      <div className="sections">
        <DNASection dna={dna} setDna={transcribe} />
        <RNASection dna={dna} rna={rna} width={width} height={height} />
        <ORFsSection
          orfList={orfList}
          orfIndex={orfIndex}
          width={width}
          height={height}
          setOrf={translate}
        />
        <PolypeptideSection 
          orf={orf}
          aminoAcidDefs={aminoAcidDefs}
          width={width}
          height={height}
        />
      </div>
      <footer className="footer"></footer>
    </div>
  );
}
