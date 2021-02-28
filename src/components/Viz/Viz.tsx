import * as React from 'react';
import { useState } from 'react';

// @ts-ignore
import images from '../../assets/images/*.jpg';
import {
  getBaseName,
  getBaseColor,
  getAminoAcidDetailsFromCode,
  getAminoAcidPropTypeColor,
  translateRnaSequence,
} from '../../../utils/baseUtils';
import { BaseSymbol, AminoAcidCode } from '../../../types/baseTypes';

type BaseProps = {
  type: 'dna' | 'rna';
  base: BaseSymbol;
  index: number;
  isLast: boolean;
  showTooltip: boolean;
  updateShowTooltip: (index: number) => void;
};

function NucleicAcidBase(props: BaseProps) {
  const {
    type,
    base,
    index,
    isLast,
    showTooltip,
    updateShowTooltip
  } = props;
  const name = getBaseName(base);
  const backgroundColor = getBaseColor(base);
  const size = 44;
  const sizeStyles = { width: size, minWidth: size, height: size };

  return (
    <div
      className={`base base__${type} base__${base.toLowerCase()} ${isLast ? 'base__last-item' : ''}`}
      style={{ ...sizeStyles, backgroundColor }}
      onClick={() => updateShowTooltip(index)}
    >
      <div
        className="base__tooltip"
        style={{ display: showTooltip ? "flex" : "none" }}
      >
        <p
          className="base__tooltip-name"
          style={{ backgroundColor }}
        >
          {name}
        </p>
        <div
          className="base__tooltip-line"
          style={{ backgroundColor }}
        />
      </div>
      <p className="base__symbol">{base}</p>
    </div>
  );
}

function NucleicAcidSequence(props: { sequence: string; type: 'dna' | 'rna' }) {
  const [visibleTooltipIndex, setVisibletooltipIndex] = useState<null | number>(null);

  const handleShowTooltip = (index: number) => {
    const value = index === visibleTooltipIndex ? null : index;
    setVisibletooltipIndex(value);
  };

  const length = [...props.sequence].length;

  return (
    <div className="sequence">
      {[...props.sequence].map((s, i) => {
        const base = s as BaseSymbol;
        const isLast = i === length - 1;
        return (
          <NucleicAcidBase
            key={`${i}.${s}`}
            base={base}
            type={props.type}
            index={i}
            isLast={isLast}
            showTooltip={i === visibleTooltipIndex}
            updateShowTooltip={handleShowTooltip}
          />
        );
      })}
    </div>
  );
}

function NucleicAcidSequenceArrows(props: { length: number }) {
  const arrows = new Array(props.length).fill(null).map((_, i) => i);
  return (
    <div className="arrows">
      {arrows.map(a => (
        <div key={a} className="arrow">
          <i className="material-icons">south</i>
        </div>
      ))}
    </div>
  );
}

type AminoAcidsProps = {
  left: number;
  aminoAcids: AminoAcidCode[];
};

function AminoAcids(props: AminoAcidsProps) {
  const unit = 44;
  const { left, aminoAcids } = props;
  const size = unit * 3; // codon length

  return (
    <div className="amino-acids" style={{ marginLeft: left * unit }}>
      {aminoAcids.map((acid, i) => {
        const { name, propType } = getAminoAcidDetailsFromCode(acid);
        const backgroundColor = propType ? getAminoAcidPropTypeColor(propType) : 'white';
        const propTypeClassName = propType
          ? `amino-acid__prop-type-${propType.toLowerCase().replace(' ', '-')}`
          : '';

        return (
          <div
            key={`${i}.${acid}`}
            className="amino-acid"
            style={{ width: size, minWidth: size }}
          >
            <p className="amino-acid__name" style={{ height: unit }}>
              {name}
            </p>
            {propType && (
              <p
                className={`amino-acid__prop-type ${propTypeClassName}`}
                style={{ backgroundColor, height: unit }}
              >
                {propType}
              </p>
            )}
            <div className="amino-acid__diagram" style={{ width: size }}>
              <img src={`${images[`${acid.toLowerCase()}`]}`} alt={name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Polypeptides(props: { sequence: string }) {
  const { polypeptideChain, indexes } = translateRnaSequence(props.sequence);
  return (
    <div className="polypeptides">
      {[...polypeptideChain].map((a, i) => {
        const currBegin = indexes[i][0];
        const prevEnd = indexes[i - 1] ? indexes[i - 1][1] : 0;
        return <AminoAcids key={i} aminoAcids={a} left={currBegin - prevEnd} />;
      })}
    </div>
  );
}

type VizHeaderItemProps = {
  title: string,
  description: string;
  index: number;
  showTooltip: boolean;
  updateShowTooltip: (index: number) => void;
};

function VizHeaderItem(props: VizHeaderItemProps) {
  const {
    title,
    description,
    index,
    showTooltip,
    updateShowTooltip
  } = props;
  return (
    <div className="viz__section__header-item">
      <h3>{title}</h3>
      <i className="material-icons" onClick={() => updateShowTooltip(index)}>help</i>
      <div
        className="viz__section__header-tooltip"
        style={{ display: showTooltip ? "flex" : "none" }}
        onClick={() => updateShowTooltip(index)}
      >
        <p>{description}</p>
      </div>
    </div>
  )
}

function VizHeader() {
  const data = [
    {
      title: 'DNA Sequence',
      description: [
        'Transcription is the first of several steps of DNA based gene expression in',
        'which a particular segment of DNA is copied into mRNA by the enzyme RNA polymerase.',
        'The DNA strand consists of nucleotide bases:',
        'Adenine (A), Cytosine (C), Guanine (G), and Thymine (T).',
      ].join(' '),
    },
    {
      title: 'mRNA Sequence',
      description: [
        'The transcribed mRNA strand has complementary nucleotide bases:',
        'Uracil (U), Guanine (G), Cytosine (C), and Adenine (A).',
        'Transcription is followed by Translation, where the mRNA is decoded in a ribosome',
        'to produce a specific amino acid chain.',
      ].join(' '),
    },
    {
      title: 'Amino Acids',
      description: [
        'This amino acid chain, also referred to as polypeptide, is derived from "codons" (sets of 3 bases).',
        'AUG is the start codon and UAA/UAG/UGA are all stop codons',
        'The polypeptide later folds into an active protein and performs its functions in the cell.'
      ].join(' '),
    },
    {
      title: 'Chemical Property',
      description: [
        'Amino acids can be classified based on the polarity or if they are acidic or basic.',
      ].join(' '),
    },
  ];

  const [visibleTooltipIndex, setVisibletooltipIndex] = useState<null | number>(null);

  const handleShowTooltip = (index: number) => {
    const value = index === visibleTooltipIndex ? null : index;
    setVisibletooltipIndex(value);
  };

  return (
    <div className="viz__section__header">
      {data.map((d, i) => {
        const { title, description } = d;
        return (
          <VizHeaderItem
            key={title}
            title={title}
            index={i}
            description={description}
            showTooltip={i === visibleTooltipIndex}
            updateShowTooltip={handleShowTooltip}
          />
        )
      })}
    </div>
  );
}

type VizProps = {
  dnaSequence: string;
  rnaSequence: string;
};

export function Viz(props: VizProps) {
  return (
    <div className="viz">
      <div className="viz__section">
        <VizHeader />
        <div className="viz__section__body">
          <NucleicAcidSequence
            sequence={props.dnaSequence}
            type="dna"
          />
          <NucleicAcidSequenceArrows length={props.dnaSequence.length} />
          <NucleicAcidSequence
            sequence={props.rnaSequence}
            type="rna"
          />
          <Polypeptides sequence={props.rnaSequence} />
        </div>
      </div>
    </div>
  );
}


