import {
  A,
  C,
  G,
  T,
  U,
  bases,
  BaseSymbol,
  BaseName,
  AminoAcidCode,
  AminoAcidBioChemPropType,
  AminoAcidDetails,
  RnaPolypeptideTranslationResult,
  RnaSequenceTranslationResult,
  TranslationFramesResult,
} from '../types/baseTypes';

const mapDnaCodonToAminoAcidCode: { [codon: string]: AminoAcidCode } = {
  TTT: 'Phe',
  TTC: 'Phe',
  TTA: 'Leu',
  TTG: 'Leu',

  TCT: 'Ser',
  TCC: 'Ser',
  TCA: 'Ser',
  TCG: 'Ser',

  TAT: 'Tyr',
  TAC: 'Tyr',
  TAA: 'STOP',
  TAG: 'STOP',

  TGT: 'Cys',
  TGC: 'Cys',
  TGA: 'STOP',
  TGG: 'Trp',

  CTT: 'Leu',
  CTC: 'Leu',
  CTA: 'Leu',
  CTG: 'Leu',

  CCT: 'Pro',
  CCC: 'Pro',
  CCA: 'Pro',
  CCG: 'Pro',

  CAT: 'His',
  CAC: 'His',
  CAA: 'Gln',
  CAG: 'Gln',

  CGT: 'Arg',
  CGC: 'Arg',
  CGA: 'Arg',
  CGG: 'Arg',

  ATT: 'Ile',
  ATC: 'Ile',
  ATA: 'Ile',
  ATG: 'Met',

  ACT: 'Thr',
  ACC: 'Thr',
  ACA: 'Thr',
  ACG: 'Thr',

  AAT: 'Asn',
  AAC: 'Asn',
  AAA: 'Lys',
  AAG: 'Lys',

  AGT: 'Ser',
  AGC: 'Ser',
  AGA: 'Arg',
  AGG: 'Arg',

  GTT: 'Val',
  GTC: 'Val',
  GTA: 'Val',
  GTG: 'Val',

  GCT: 'Ala',
  GCC: 'Ala',
  GCA: 'Ala',
  GCG: 'Ala',

  GAT: 'Asp',
  GAC: 'Asp',
  GAA: 'Glu',
  GAG: 'Glu',

  GGT: 'Gly',
  GGC: 'Gly',
  GGA: 'Gly',
  GGG: 'Gly',
};

const mapRnaCodonToAminoAcidCode: { [codon: string]: AminoAcidCode } = {
  UUU: 'Phe',
  UUC: 'Phe',
  UUA: 'Leu',
  UUG: 'Leu',

  UCU: 'Ser',
  UCC: 'Ser',
  UCA: 'Ser',
  UCG: 'Ser',

  UAU: 'Tyr',
  UAC: 'Tyr',
  UAA: 'STOP',
  UAG: 'STOP',

  UGU: 'Cys',
  UGC: 'Cys',
  UGA: 'STOP',
  UGG: 'Trp',

  CUU: 'Leu',
  CUC: 'Leu',
  CUA: 'Leu',
  CUG: 'Leu',

  CCU: 'Pro',
  CCC: 'Pro',
  CCA: 'Pro',
  CCG: 'Pro',

  CAU: 'His',
  CAC: 'His',
  CAA: 'Gln',
  CAG: 'Gln',

  CGU: 'Arg',
  CGC: 'Arg',
  CGA: 'Arg',
  CGG: 'Arg',

  AUU: 'Ile',
  AUC: 'Ile',
  AUA: 'Ile',
  AUG: 'Met',

  ACU: 'Thr',
  ACC: 'Thr',
  ACA: 'Thr',
  ACG: 'Thr',

  AAU: 'Asn',
  AAC: 'Asn',
  AAA: 'Lys',
  AAG: 'Lys',

  AGU: 'Ser',
  AGC: 'Ser',
  AGA: 'Arg',
  AGG: 'Arg',

  GUU: 'Val',
  GUC: 'Val',
  GUA: 'Val',
  GUG: 'Val',

  GCU: 'Ala',
  GCC: 'Ala',
  GCA: 'Ala',
  GCG: 'Ala',

  GAU: 'Asp',
  GAC: 'Asp',
  GAA: 'Glu',
  GAG: 'Glu',

  GGU: 'Gly',
  GGC: 'Gly',
  GGA: 'Gly',
  GGG: 'Gly',
};

const mapAminoAcidCodeToFullName: { [key in AminoAcidCode]: string } = {
  Phe: 'Phenylalanine',
  Leu: 'Leucine',
  Ser: 'Serine',
  Tyr: 'Tyrosine',
  STOP: 'STOP',
  Cys: 'Cysteine',
  Trp: 'Tryptophan',
  Pro: 'Proline',
  His: 'Histidine',
  Gln: 'Glutamine',
  Arg: 'Arginine',
  Ile: 'Isoleucine',
  Met: 'Methionine',
  Thr: 'Threonine',
  Asn: 'Asparagine',
  Lys: 'Lysine',
  Val: 'Valine',
  Ala: 'Alanine',
  Asp: 'Aspartic acid',
  Glu: 'Glutamic acid',
  Gly: 'Glycine',
};

const mapAminoAcidCodeToPropType: { [key in AminoAcidCode]: null | AminoAcidBioChemPropType } = {
  Phe: 'Nonpolar',
  Leu: 'Nonpolar',
  Ser: 'Polar',
  Tyr: 'Polar',
  STOP: null,
  Cys: 'Polar',
  Trp: 'Nonpolar',
  Pro: 'Nonpolar',
  His: 'Basic',
  Gln: 'Polar',
  Arg: 'Basic',
  Ile: 'Nonpolar',
  Met: 'Nonpolar',
  Thr: 'Nonpolar',
  Asn: 'Polar',
  Lys: 'Basic',
  Val: 'Nonpolar',
  Ala: 'Nonpolar',
  Asp: 'Acidic',
  Glu: 'Acidic',
  Gly: 'Nonpolar',
};

export function getBaseName(base: BaseSymbol): BaseName {
  if (!bases[base]) {
    throw new Error(`Cannot find name for invalid base symbol: ${base}`);
  }
  return bases[base];
}

export function getBaseColor(base: BaseSymbol): string {
  switch (base) {    
    case A: return '#0971f1';
    case C: return '#e00000';
    case G: return '#00c000';
    case T:
    case U: return '#e6e600';
    default: throw new Error(`Cannot find a color for invalid base symbol: ${base}`);
  }
}

export function convertBaseDnaToRna(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return U;
    case C: return G;
    case G: return C;
    case T: return A;
    default: throw new Error(`Cannot convert invalid DNA base symbol: ${base}`);
  }
}

export function convertBaseRnaToDna(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return T;
    case C: return G;
    case G: return C;
    case U: return A;
    default: throw new Error(`Cannot convert invalid RNA base symbol: ${base}`);
  }
}

export function getAminoAcidCodeFromDnaCodon(codon: string): null | AminoAcidCode {
  const aminoAcid = mapDnaCodonToAminoAcidCode[codon];
  if (!aminoAcid) throw new Error(`Cannot find an amino acid for invalid DNA codon: ${codon}`);
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

export function getAminoAcidCodeFromRnaCodon(codon: string): null | AminoAcidCode {
  const aminoAcid = mapRnaCodonToAminoAcidCode[codon];
  if (!aminoAcid) throw new Error(`Cannot find an amino acid for invalid RNA codon: ${codon}`);
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

export function getAminoAcidDetailsFromCode(code: AminoAcidCode): AminoAcidDetails {
  const name = mapAminoAcidCodeToFullName[code];
  if (!name) throw new Error(`Cannot find amino acid name for code: ${code}`);

  const propType = mapAminoAcidCodeToPropType[code];
  if (propType === undefined) throw new Error(`Cannot find amino acid biochemical properties for code: ${code}`);

  return {
    name,
    propType,
  };
}

export function getAminoAcidPropTypeColor(propType: AminoAcidBioChemPropType) {
  switch (propType) {
    case 'Nonpolar': return '#ffe75f';
    case 'Polar': return '#b3dec0';
    case 'Basic': return '#bbbfe0';
    case 'Acidic': return '#f8b7d3';
    default: throw new Error(`Cannot find a color for invalid biochemical property: ${propType}`);
  }
}

function translateRnaSequenceToPolypeptide(
  sequence: string,
  polypeptide: AminoAcidCode[],
): RnaPolypeptideTranslationResult {
  const codon = sequence.slice(0, 3);
  const remainingSequence = sequence.slice(3);
  const aminoAcid = getAminoAcidCodeFromRnaCodon(codon);

  if (!aminoAcid || remainingSequence.length < 3) {
    return {
      remainingSequence: sequence,
      polypeptide,
    };
  }

  polypeptide.push(aminoAcid);

  return translateRnaSequenceToPolypeptide(remainingSequence, polypeptide);
}

export function translateRnaSequence(
  sequence: string,
  polypeptideChain?: AminoAcidCode[][],
  indexes?: number[][],
): RnaSequenceTranslationResult {
  let sequenceResult: RnaSequenceTranslationResult = {
    remainingSequence: sequence,
    polypeptideChain: polypeptideChain || [],
    indexes: indexes || [],
  };

  const [initial, remaining] = sequence.split(/AUG(.+)/);
  if (!remaining) return sequenceResult;

  const polypeptideResult = translateRnaSequenceToPolypeptide(remaining, ['Met']);
  const padding = sequenceResult.indexes.length
    ? sequenceResult.indexes[sequenceResult.indexes.length - 1][1]
    : 0;
  const beginIndex = padding + initial.length;
  const endIndex = padding + sequence.length - polypeptideResult.remainingSequence.length;

  sequenceResult = {
    remainingSequence: polypeptideResult.remainingSequence,
    polypeptideChain: [...sequenceResult.polypeptideChain, polypeptideResult.polypeptide],
    indexes: [...sequenceResult.indexes, [beginIndex, endIndex]],
  };

  return translateRnaSequence(
    sequenceResult.remainingSequence,
    sequenceResult.polypeptideChain,
    sequenceResult.indexes
  );
}

function convertSequenceToCodons(sequence: string, allCodons: string[] = []): string[] {
  if (sequence.length < 3) return allCodons;

  const codon = sequence.slice(0, 3);
  const remaining = sequence.slice(3);

  allCodons.push(codon);
  return convertSequenceToCodons(remaining, allCodons);
}

function getValidReadingFrame(frame: Array<null | AminoAcidCode>): Array<null | AminoAcidCode> {
  const readingFrame: Array<null | AminoAcidCode> = [];
  let started = false;

  for (let i = 0; i < frame.length; i += 1) {
    const codon = frame[i];
    if (codon === 'Met' && !started) {
      started = true;
      readingFrame.push(codon);
    } else if (codon !== null && started) {
      readingFrame.push(codon);
    } else if (codon === null && started) {
      break;
    }
  }

  return readingFrame;
}

export function translateRnaSequenceToFrames(sequence: string): TranslationFramesResult {
  const codons1 = convertSequenceToCodons(sequence);
  const codons2 = convertSequenceToCodons(sequence.slice(1));
  const codons3 = convertSequenceToCodons(sequence.slice(2));

  return [
    getValidReadingFrame(codons1.map(getAminoAcidCodeFromRnaCodon)),
    getValidReadingFrame(codons2.map(getAminoAcidCodeFromRnaCodon)),
    getValidReadingFrame(codons3.map(getAminoAcidCodeFromRnaCodon)),
  ];
}






