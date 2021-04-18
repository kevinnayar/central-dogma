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
  AminoAcidDef,
  RnaPolypeptideTranslation,
  OrfList,
} from '../types/baseTypes';

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

function transcribeDnaBaseToRnaBase(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return U;
    case C: return G;
    case G: return C;
    case T: return A;
    default: throw new Error(`Cannot convert invalid DNA base symbol: "${base}"`);
  }
}

function reverseTranscribeRnaBaseToDnaBase(base: BaseSymbol): BaseSymbol {
  switch (base) {
    case A: return T;
    case C: return G;
    case G: return C;
    case U: return A;
    default: throw new Error(`Cannot convert invalid RNA base symbol: "${base}"`);
  }
}

export function transcribeDnaToRna(dna: string): string {
  let rna = '';
  for (const letter of dna) {
    const base: any = letter as keyof BaseSymbol;
    rna += transcribeDnaBaseToRnaBase(base);
  }
  return rna;
}

export function reverseTranscribeRnaToDna(rna: string): string {
  let dna = '';
  for (const letter of rna) {
    const base: any = letter as keyof BaseSymbol;
    dna += reverseTranscribeRnaBaseToDnaBase(base);
  }
  return dna;
}

export function getAminoAcidCodeFromRnaCodon(codon: string): null | AminoAcidCode {
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
  const aminoAcid = mapRnaCodonToAminoAcidCode[codon];
  if (!aminoAcid) throw new Error(`Cannot find an amino acid for RNA codon: "${codon || 'none'}"`);
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

export function getAminoAcidCodeFromDnaCodon(codon: string): null | AminoAcidCode {
  const mapRnaCodonToAminoAcidCode: { [codon: string]: AminoAcidCode } = {
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
  const aminoAcid = mapRnaCodonToAminoAcidCode[codon];
  if (!aminoAcid) throw new Error(`Cannot find an amino acid for DNA codon: "${codon || 'none'}"`);
  return aminoAcid === 'STOP' ? null : aminoAcid;
}

function getAminoAcidName(code: AminoAcidCode): string {
  const mapAminoAcidCodeToName: { [key in AminoAcidCode]: string } = {
    Ala: 'Alanine',
    Arg: 'Arginine',
    Asn: 'Asparagine',
    Asp: 'Aspartic acid',
    Cys: 'Cysteine',
    Gln: 'Glutamine',
    Glu: 'Glutamic acid',
    Gly: 'Glycine',
    His: 'Histidine',
    Ile: 'Isoleucine',
    Leu: 'Leucine',
    Lys: 'Lysine',
    Met: 'Methionine',
    Phe: 'Phenylalanine',
    Pro: 'Proline',
    Ser: 'Serine',
    STOP: 'STOP',
    Thr: 'Threonine',
    Trp: 'Tryptophan',
    Tyr: 'Tyrosine',
    Val: 'Valine',
  };
  const name = mapAminoAcidCodeToName[code];
  if (!name) throw new Error(`Cannot find an amino acid name for code: "${code || 'none'}"`);
  return name;
}

function getAminoAcidLetter(code: AminoAcidCode): string {
  const mapAminoAcidCodeToLetter: { [key in AminoAcidCode]: string } = {
    Ala: 'A',
    Arg: 'R',
    Asn: 'N',
    Asp: 'D',
    Cys: 'C',
    Glu: 'E',
    Gln: 'Q',
    Gly: 'G',
    His: 'H',
    Ile: 'I',
    Leu: 'L',
    Lys: 'K',
    Met: 'M',
    Phe: 'F',
    Pro: 'P',
    Ser: 'S',
    STOP: 'STOP',
    Thr: 'T',
    Trp: 'W',
    Tyr: 'Y',
    Val: 'V',
  };
  const letter = mapAminoAcidCodeToLetter[code];
  if (!letter) throw new Error(`Cannot find an amino acid one letter code for code: "${code || 'none'}"`);
  return letter;
}

function getAminoAcidColor(code: AminoAcidCode): string {
  switch (code) {
    case 'Phe':
      return '#3232AA';
    case 'Leu':
      return '#0F820F';
    case 'Ser':
      return '#FA9600';
    case 'Tyr':
      return '#3232AA';
    case 'STOP':
      return 'black';
    case 'Cys':
      return '#E6E600';
    case 'Trp':
      return '#B45AB4';
    case 'Pro':
      return '#DC9682';
    case 'His':
      return '#8282D2';
    case 'Gln':
      return '#00DCDC';
    case 'Arg':
      return '#145AFF';
    case 'Ile':
      return '#0F820F';
    case 'Met':
      return '#E6E600';
    case 'Thr':
      return '#FA9600';
    case 'Asn':
      return '#00DCDC';
    case 'Lys':
      return '#145AFF';
    case 'Val':
      return '#0F820F';
    case 'Ala':
      return '#C8C8C8';
    case 'Asp':
      return '#E60A0A';
    case 'Glu':
      return '#E60A0A';
    case 'Gly':
      return '#EBEBEB';
    default:
      throw new Error(`Cannot find a color for amino acid: "${code}"`);
  }
}

function getAminoAcidPropType(code: AminoAcidCode): null | AminoAcidBioChemPropType {
  const mapAminoAcidCodeToPropType: { [key in AminoAcidCode]: null | AminoAcidBioChemPropType } = {
    Ala: 'Nonpolar',
    Arg: 'Basic',
    Asn: 'Polar',
    Asp: 'Acidic',
    Cys: 'Polar',
    Gln: 'Polar',
    Glu: 'Acidic',
    Gly: 'Nonpolar',
    His: 'Basic',
    Ile: 'Nonpolar',
    Leu: 'Nonpolar',
    Lys: 'Basic',
    Met: 'Nonpolar',
    Phe: 'Nonpolar',
    Pro: 'Nonpolar',
    Ser: 'Polar',
    STOP: null,
    Thr: 'Nonpolar',
    Trp: 'Nonpolar',
    Tyr: 'Polar',
    Val: 'Nonpolar',
  };
  const propType = mapAminoAcidCodeToPropType[code];
  if (propType === undefined) throw new Error(`Cannot find an amino acid propType for code: "${code || 'none'}"`);
  return propType;
}

function getAminoAcidPropTypeColor(propType: AminoAcidBioChemPropType): string {
  switch (propType) {
    case 'Nonpolar':
      return '#ffe75f';
    case 'Polar':
      return '#b3dec0';
    case 'Basic':
      return '#bbbfe0';
    case 'Acidic':
      return '#f8b7d3';
    default:
      throw new Error(`Cannot find a color for invalid biochemical property: "${propType}"`);
  }
}

export function getAminoAcidDef(code: AminoAcidCode): null | AminoAcidDef {
  if (code === 'STOP') return null;
  const name = getAminoAcidName(code);
  const letterCode = getAminoAcidLetter(code);
  const color = getAminoAcidColor(code);
  const propType = getAminoAcidPropType(code);
  const propColor = getAminoAcidPropTypeColor(propType);

  return {
    code,
    letterCode,
    name,
    color,
    propType,
    propColor,
  };
}

export function translateRnaSequenceToPolypeptide(
  sequence: string,
  polypeptide: AminoAcidCode[] = [],
  type: 'dna' | 'rna' = 'rna',
): RnaPolypeptideTranslation {
  const codon = sequence.slice(0, 3);
  const remainingSequence = sequence.slice(3);
  const fn = type === 'dna' ? getAminoAcidCodeFromDnaCodon : getAminoAcidCodeFromRnaCodon;
  const aminoAcid = fn(codon);

  if (aminoAcid) polypeptide.push(aminoAcid);

  if (!aminoAcid || remainingSequence.length < 3) {
    return {
      polypeptide,
      remainingSequence: !aminoAcid ? sequence : remainingSequence,
    };
  }

  return translateRnaSequenceToPolypeptide(remainingSequence, polypeptide, type);
}

// ORFs
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

export function getLongestORFIndex(orfList: OrfList): number {
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

export function getLongestORF(orfList: OrfList): string {
  const index = getLongestORFIndex(orfList);
  return orfList[index];
}
