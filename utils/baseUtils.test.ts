import { describe, expect, test } from '@jest/globals';
import { OrfList } from 'types/baseTypes';
import {
  getBaseName,
  transcribeDnaToRna,
  reverseTranscribeRnaToDna,
  getAminoAcidDef,
  translateRnaSequenceToPolypeptide,
  getOpenReadingFrame,
  getAllOpenReadingFrames,
  getLongestORF,
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
    expect(transcribeDnaToRna('ACTGACTG')).toEqual('UGACUGAC');
  });

  test('reverseTranscribeRnaBaseToDnaBase', () => {
    expect(reverseTranscribeRnaToDna('UGACUGAC')).toEqual('ACTGACTG');
  });

  test('getAminoAcidDef', () => {
    expect(getAminoAcidDef('STOP')).toEqual(null);

    expect(getAminoAcidDef('Met')).toEqual({
      code: 'Met',
      name: 'Methionine',
      color: '#E6E600',
      propType: 'Nonpolar',
      propColor: '#ffe75f',
    });

    expect(getAminoAcidDef('Phe')).toEqual({
      code: 'Phe',
      name: 'Phenylalanine',
      color: '#3232AA',
      propType: 'Nonpolar',
      propColor: '#ffe75f',
    });
  });

  test('translateRnaSequenceToPolypeptide', () => {
    expect(() => translateRnaSequenceToPolypeptide('')).toThrow(
      'Cannot find an amino acid for RNA codon: "none"',
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

  test('getLongestORF', () => {
    const orfList: OrfList = [
      'AUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAA',
      'AUGUAUGUCUUAUUAGUGUCUUCCUCAUCG',
      'AUGUCUUAU',
      '',
      '',
      '',
    ];
    expect(getLongestORF(orfList)).toEqual('AUGUAUGUAUGUCUUAUUAGUGUCUUCCUCAUCGUGAUCCUGGUGAAA');

    const orfsCovidBNT162b2 = getAllOpenReadingFrames(sequenceCovidBNT162b2, 'dna');
    expect(getLongestORF(orfsCovidBNT162b2)).toEqual(orfsCovidBNT162b2[0]);

    const orfsCovidMRNA1273 = getAllOpenReadingFrames(sequenceCovidMRNA1273, 'dna');
    expect(getLongestORF(orfsCovidMRNA1273)).toEqual(orfsCovidMRNA1273[0]);
  });
});


