import { describe, expect, test } from '@jest/globals';
import { OrfList } from 'types/baseTypes';
import {
  getBaseName,
  transcribeDnaToRna,
  reverseTranscribeRnaToDna,
  getAminoAcidCodeFromRnaCodon,
  getAminoAcidDetailsFromCode,
  translateRnaSequenceToPolypeptide,
  getOpenReadingFrame,
  getAllOpenReadingFrames,
  getLongestOpenReadingFrame,
} from './baseUtils';
import {
  sequenceCovidBNT162b2,
  sequenceCovidMRNA1273,
} from './sequenceData';

describe('baseUtils', () => {
  test('getBaseName', () => {
    expect(getBaseName('A')).toEqual('Adenine');
    expect(getBaseName('C')).toEqual('Cytosine');
    expect(getBaseName('G')).toEqual('Guanine');
    expect(getBaseName('T')).toEqual('Thymine');
    expect(getBaseName('U')).toEqual('Uracil');
  });

  test('transcribeDnaToRna', () => {
    expect(transcribeDnaToRna('A')).toEqual('U');
    expect(transcribeDnaToRna('C')).toEqual('G');
    expect(transcribeDnaToRna('G')).toEqual('C');
    expect(transcribeDnaToRna('T')).toEqual('A');
  });

  test('reverseTranscribeRnaToDna', () => {
    expect(reverseTranscribeRnaToDna('A')).toEqual('T');
    expect(reverseTranscribeRnaToDna('C')).toEqual('G');
    expect(reverseTranscribeRnaToDna('G')).toEqual('C');
    expect(reverseTranscribeRnaToDna('U')).toEqual('A');
  });

  test('getAminoAcidCodeFromRnaCodon', () => {
    expect(getAminoAcidCodeFromRnaCodon('AUG')).toEqual('Met');
    expect(getAminoAcidCodeFromRnaCodon('CCU')).toEqual('Pro');
    expect(getAminoAcidCodeFromRnaCodon('CGU')).toEqual('Arg');

    expect(getAminoAcidCodeFromRnaCodon('UAA')).toEqual(null);
    expect(getAminoAcidCodeFromRnaCodon('UAG')).toEqual(null);
    expect(getAminoAcidCodeFromRnaCodon('UGA')).toEqual(null);
  });

  test('getAminoAcidDetailsFromCode', () => {
    expect(getAminoAcidDetailsFromCode('Met')).toEqual({
      name: 'Methionine',
      propType: 'Nonpolar',
    });
    expect(getAminoAcidDetailsFromCode('Tyr')).toEqual({
      name: 'Tyrosine',
      propType: 'Polar',
    });
    expect(getAminoAcidDetailsFromCode('Asp')).toEqual({
      name: 'Aspartic acid',
      propType: 'Acidic',
    });
    expect(getAminoAcidDetailsFromCode('Lys')).toEqual({
      name: 'Lysine',
      propType: 'Basic',
    });
  });

  test('getAminoAcidDetails', () => {
    expect(getAminoAcidDetailsFromCode(getAminoAcidCodeFromRnaCodon('AUG'))).toEqual({
      name: 'Methionine',
      propType: 'Nonpolar',
    });
    expect(getAminoAcidDetailsFromCode(getAminoAcidCodeFromRnaCodon('AAG'))).toEqual({
      name: 'Lysine',
      propType: 'Basic',
    });
  });

  test('translateRnaSequenceToPolypeptide', () => {
    expect(() => translateRnaSequenceToPolypeptide('')).toThrow(
      'Cannot find an amino acid for invalid RNA codon: "none"',
    );

    expect(translateRnaSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAU')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: '',
    });

    expect(translateRnaSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAA')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAA',
    });

    expect(translateRnaSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGA')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAAUGA',
    });

    expect(translateRnaSequenceToPolypeptide('UUUUUCUUAUUGUCUUCCUCAUCGUAUUAAUGAUUU')).toEqual({
      polypeptide: ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr'],
      remainingSequence: 'UAAUGAUUU',
    });
  });

  test('getOpenReadingFrame', () => {
    const rnaNoStart = 'UUUUUCUUAUUGUCUUCCUCAUCGUAU';
    expect(getOpenReadingFrame(rnaNoStart)).toEqual('');

    const rnaStopUAG = 'UUUAUGUUCUUAUUGUCUUCCUCAUCGUAUUAGCUC';
    expect(getOpenReadingFrame(rnaStopUAG)).toEqual('AUGUUCUUAUUGUCUUCCUCAUCGUAU');

    const rnaStopUAA = 'UUUAUGUUCUUAUUGUCUUCCUCAUCGUAACUCUUU';
    expect(getOpenReadingFrame(rnaStopUAA)).toEqual('AUGUUCUUAUUGUCUUCCUCAUCG');

    const rnaStopUGA = 'UUUAUGUUCUUAUUGUCUUCCUCAUCGUGAUCCUGG';
    expect(getOpenReadingFrame(rnaStopUGA)).toEqual('AUGUUCUUAUUGUCUUCCUCAUCG');

    const rnaNoStop = 'UUUAUGUUCUUAUUGUCUUCCUCAUCGUAU';
    expect(getOpenReadingFrame(rnaNoStop)).toEqual('');
  });

  test('getAllOpenReadingFrames', () => {
    const rna = 'UUUAUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAAUAAAAG';
    expect(getAllOpenReadingFrames(rna)).toEqual([
      'AUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAA',
      'AUGUAUGUCUUAUUAGUGUCUUCCUCAUCG',
      'AUGUCUUAU',
      '',
      '',
      '',
    ]);
  });

  test('getLongestOpenReadingFrame', () => {
    const orfList: OrfList = [
      'AUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAA',
      'AUGUAUGUCUUAUUAGUGUCUUCCUCAUCG',
      'AUGUCUUAU',
      '',
      '',
      '',
    ];
    expect(getLongestOpenReadingFrame(orfList)).toEqual('AUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAA');

    const orfsCovidBNT162b2 = getAllOpenReadingFrames(sequenceCovidBNT162b2, 'dna');
    expect(getLongestOpenReadingFrame(orfsCovidBNT162b2)).toEqual(orfsCovidBNT162b2[0]);

    const orfsCovidMRNA1273 = getAllOpenReadingFrames(sequenceCovidMRNA1273, 'dna');
    expect(getLongestOpenReadingFrame(orfsCovidMRNA1273)).toEqual(orfsCovidMRNA1273[0]);
  });
});


