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
  RnaPolypeptideTranslation,
  OrfList,
} from '../types/baseTypes';

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
    throw new Error(`Cannot find name for invalid base symbol: "${base}"`);
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
    default: throw new Error(`Cannot find a color for invalid base symbol: "${base}"`);
  }
}

export function transcribeDnaToRna(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return U;
    case C: return G;
    case G: return C;
    case T: return A;
    default: throw new Error(`Cannot convert invalid DNA base symbol: "${base}"`);
  }
}

export function reverseTranscribeRnaToDna(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return T;
    case C: return G;
    case G: return C;
    case U: return A;
    default: throw new Error(`Cannot convert invalid RNA base symbol: "${base}"`);
  }
}

export function getAminoAcidCodeFromRnaCodon(codon: string): null | AminoAcidCode {
  const aminoAcid = mapRnaCodonToAminoAcidCode[codon];
  if (!aminoAcid) throw new Error(`Cannot find an amino acid for invalid RNA codon: "${codon || 'none'}"`);
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

export function getAminoAcidDetailsFromCode(code: AminoAcidCode): AminoAcidDetails {
  const name = mapAminoAcidCodeToFullName[code];
  if (!name) throw new Error(`Cannot find amino acid name for code: "${code || 'none'}"`);

  const propType = mapAminoAcidCodeToPropType[code];
  if (propType === undefined) throw new Error(`Cannot find amino acid biochemical properties for code: "${code}"`);

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
    default: throw new Error(`Cannot find a color for invalid biochemical property: "${propType}"`);
  }
}

export function translateRnaSequenceToPolypeptide(
  sequence: string,
  polypeptide: AminoAcidCode[] = [],
): RnaPolypeptideTranslation {
  const codon = sequence.slice(0, 3);
  const remainingSequence = sequence.slice(3);
  const aminoAcid = getAminoAcidCodeFromRnaCodon(codon);

  if (aminoAcid) polypeptide.push(aminoAcid);

  if (!aminoAcid || remainingSequence.length < 3) {
    return {
      polypeptide,
      remainingSequence: !aminoAcid ? sequence : remainingSequence,
    };
  }

  return translateRnaSequenceToPolypeptide(remainingSequence, polypeptide);
}

export function getOpenReadingFrame(sequence: string, type: 'rna' | 'dna' = 'rna'): string {
  const startCodon = type === 'rna' ? 'AUG' : 'ATG';
  const stopCodons = type === 'rna' ? ['UAG', 'UAA', 'UGA'] : ['TAG', 'TAA', 'TGA'];

  const iterations = Math.floor(sequence.length / 3);

  let orf = '';
  let started = false;

  for (let i = 0; i < iterations; i += 1) {
    const letter0 = sequence[i * 3 + 0];
    const letter1 = sequence[i * 3 + 1];
    const letter2 = sequence[i * 3 + 2];

    if (!letter0 || !letter1 || !letter2) break;

    const codon = `${letter0}${letter1}${letter2}`;

    if (codon === startCodon && !started) started = true;

    if (stopCodons.includes(codon)) break;

    if (started) orf += codon;

    if (i === iterations - 1) return ''; // no stop codon
  }

  return orf;
}

export function getAllOpenReadingFrames(sequence: string, type: 'rna' | 'dna' = 'rna'): OrfList {
  const reversed = sequence.split('').reverse().join('');
  return [
    getOpenReadingFrame(sequence, type),
    getOpenReadingFrame(sequence.slice(1), type),
    getOpenReadingFrame(sequence.slice(2), type),
    getOpenReadingFrame(reversed, type),
    getOpenReadingFrame(reversed.slice(1), type),
    getOpenReadingFrame(reversed.slice(2), type),
  ];
}

export function getLongestOpenReadingFrame(orfList: OrfList): string {
  let longest = orfList[0];

  for (const orf of orfList) {
    if (orf.length > longest.length) longest = orf;
  }

  return longest;
}

export function getLongestOpenReadingFrameIndex(orfList: OrfList): number {
  let index = 0;
  let length = 0;

  for (let i = 0; i < orfList.length; i += 1) {
    const orf = orfList[i];
    if (orf.length > length) {
      index = i;
      length = orf.length;
    }
  }

  return index;
}

