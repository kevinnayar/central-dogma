type Bases = {
  A: 'Adenine';
  C: 'Cytosine';
  G: 'Guanine';
  T: 'Thymine';
  U: 'Uracil';
};

export const dnaBases: Partial<Bases> = { A: 'Adenine', C: 'Cytosine', G: 'Guanine', T: 'Thymine' };
export const rnaBases: Partial<Bases> = { A: 'Adenine', C: 'Cytosine', G: 'Guanine', U: 'Uracil' };
export const bases = { ...dnaBases, ...rnaBases };

export type BaseSymbol = keyof Bases; // A
export type BaseName = Bases[keyof Bases]; // Adenine

export const A: BaseSymbol = 'A';
export const C: BaseSymbol = 'C';
export const G: BaseSymbol = 'G';
export const T: BaseSymbol = 'T';
export const U: BaseSymbol = 'U';

export type AminoAcidCode =
  | 'Phe'
  | 'Leu'
  | 'Ser'
  | 'Tyr'
  | 'STOP'
  | 'Cys'
  | 'Trp'
  | 'Pro'
  | 'His'
  | 'Gln'
  | 'Arg'
  | 'Ile'
  | 'Met'
  | 'Thr'
  | 'Asn'
  | 'Lys'
  | 'Val'
  | 'Ala'
  | 'Asp'
  | 'Glu'
  | 'Gly'
;

export type AminoAcidBioChemPropType = 'Nonpolar' | 'Polar' | 'Basic' | 'Acidic';

export type AminoAcidDef = {
  code: AminoAcidCode;
  letterCode: string;
  name: string;
  color: string;
  propType: AminoAcidBioChemPropType;
  propColor: string;
};

export type RnaPolypeptideTranslation = {
  polypeptide: AminoAcidCode[];
  remainingSequence: string;
};

export type OrfList = [string, string, string, string, string, string];

