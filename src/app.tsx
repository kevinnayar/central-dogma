import * as React from 'react';
import { useState } from 'react';
import { Header } from './components/Header/Header';
import {
  TranscriptionInputSection,
  TranscriptionResultSection,
  TranscriptionOrfListSection,
} from './components/Transcription/Transcription';
import {
  TranslationResultSection
} from './components/Translation/Translation';
import { getAllOpenReadingFrames, getLongestOpenReadingFrameIndex, transcribeDnaToRna } from '../utils/baseUtils';
import { BaseSymbol, OrfList } from '../types/baseTypes';

function dnaToRna(dna: string): string {
  let rna = '';
  for (const letter of dna) {
    const base: any = letter as keyof BaseSymbol;
    rna += transcribeDnaToRna(base);
  }
  return rna;
}

const seedDna = [
  'TACAAAAAGAATAACAGAAGGAGTAGCATAATGACAACGACCGAAGAG',
  'GATGACGGAGGGGGTGGCGTAGTGGTTGTCGCAGCGGCTGCCTAATAG',
  'TATTGATGGTGTTGCTTATTGTTTTTCTCATCGTCTTCCCAACAGCAT',
  'CACCGACGGCGTCGCCTACTGCTTCTCCCACCGCCTCCCATTATCACT',
].join('');

export default function App() {
  const [dna, setDna] = useState(seedDna);
  const [rna, setRna] = useState(dnaToRna(dna));

  const [orfList, setOrfList] = useState<OrfList>(getAllOpenReadingFrames(rna));
  const orfIndex = getLongestOpenReadingFrameIndex(orfList);
  const [orf, setOrf] = useState(orfList[orfIndex]);

  const transcribe = (updatedDna: string) => {
    setDna(updatedDna);

    const updatedRna = dnaToRna(updatedDna);
    setRna(updatedRna);

    const updatedOrfList = getAllOpenReadingFrames(updatedRna);
    setOrfList(updatedOrfList);
  };

  return (
    <div className="app">
      <Header title="🧬 The Central Dogma of Molecular Biology" />
      <div className="sections">
        <TranscriptionInputSection dna={dna} setDna={transcribe} />
        <TranscriptionResultSection dna={dna} rna={rna} getOrfList={() => transcribe(dna)} />
        <TranscriptionOrfListSection orfList={orfList} orfIndex={orfIndex} setOrf={setOrf} />
        <TranslationResultSection />
      </div>
      <footer className="footer"></footer>
    </div>
  );
}
