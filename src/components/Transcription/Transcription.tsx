import * as React from 'react';
import { useState, useEffect } from 'react';
import { Section } from '../Section/Section';
import { getBaseName, getBaseColor } from '../../../utils/baseUtils';
import { BaseSymbol, OrfList } from '../../../types/baseTypes';

type InputProps = {
  dna: string,
  setDna: (dna: string) => void,
};

function Input(props: InputProps) {
  const [dna, setDna] = useState(props.dna);

  const updateSequence = (e: any) => {
    e.preventDefault();
    setDna(e.target.value);
  };

  const commitSequence = (e: any) => {
    e.preventDefault();
    props.setDna(dna);
  };

  useEffect(() => {
    if (props.dna !== dna) setDna(props.dna);
  }, [props.dna]);

  return (
    <div className="transcription-input">
      <label>DNA Template Strand</label>
      <textarea value={dna} onChange={updateSequence} />
      <button onClick={commitSequence}>Update</button>
    </div>
  );
}

function Pretitle() {
  return (
    <h4>
      DNA <span>→</span> mRNA
    </h4>
  );
}

export function TranscriptionInputSection(props: InputProps) {
  return (
    <Section
      pretitle={<Pretitle />}
      title="Transcription"
      subtitle="The process of copying a segment of DNA into RNA"
      variant="dark"
    >
      <Input {...props} />
    </Section>
  );
}

type BaseProps = {
  type: 'dna' | 'rna';
  base: BaseSymbol;
  index: number;
  size: number;
};

function NucleicAcidBase(props: BaseProps) {
  const name = getBaseName(props.base);
  const backgroundColor = getBaseColor(props.base);
  const sizeStyles = { width: props.size, minWidth: props.size, height: props.size };

  return (
    <div
      className={`base base__${props.type} base__${props.base.toLowerCase()}`}
      style={{ ...sizeStyles, backgroundColor }}
    >
      <p className="base__symbol">{props.base}</p>
    </div>
  );
}

type SequenceProps = {
  sequence: string;
  type: 'dna' | 'rna';
  size: number;
};

function NucleicAcidSequence(props: SequenceProps) {
  return (
    <div className="sequence">
      {[...props.sequence].map((s, i) => {
        const base = s as BaseSymbol;
        return <NucleicAcidBase key={`${i}.${s}`} base={base} type={props.type} index={i} size={props.size} />;
      })}
    </div>
  );
}

function NucleicAcidSequenceArrows(props: { size: number, length: number }) {
  const arrows = new Array(props.length).fill(null).map((_, i) => i);
  const sizeStyles = { width: props.size, height: props.size, lineHeight: `${props.size}px` };
  return (
    <div className="arrows">
      {arrows.map((a) => (
        <div key={a} className="arrow" style={sizeStyles}>
          <i className="material-icons" style={sizeStyles}>
            south
          </i>
        </div>
      ))}
    </div>
  );
}

type ResultProps = {
  dna: string;
  rna: string;
  getOrfList: () => void;
};

function Result(props: ResultProps) {
  const size = 36;
  return (
    <div className="transcription-result">
      <div className="transcription-result__panel">
        <NucleicAcidSequence sequence={props.dna} type="dna" size={size} />
        <NucleicAcidSequenceArrows length={props.dna.length} size={size} />
        <NucleicAcidSequence sequence={props.rna} type="rna" size={size} />
      </div>
      <button onClick={props.getOrfList}>Get Open Reading Frames</button>
    </div>
  );
}

export function TranscriptionResultSection(props: ResultProps) {
  return (
    <Section
      title="Transcribed mRNA"
      subtitle="Segment of DNA transcribed into an mRNA strand"
      variant="light"
    >
      <Result dna={props.dna} rna={props.rna} getOrfList={props.getOrfList} />
    </Section>
  );
}

type OrfListProps = {
  orfList: OrfList;
  orfIndex: number;
  setOrf: (orf: string) => void;
};

function OrfListItems(props: OrfListProps) {
  const [orfIndex, setOrfIndex] = useState(props.orfIndex);
  return (
    <div className="transcription-orf-list">
      {props.orfList.map((orf, index) => {
        if (!orf.length) return null;
        return (
          <div key={orf} className="transcription-orf-list-item">
            <div
              className={`selector ${orfIndex === index ? 'selected' : ''}`}
              onClick={() => {
                setOrfIndex(index);
                const selectedOrf = props.orfList[index];
                props.setOrf(selectedOrf);
              }}
            />
            <div className="transcription-orf-list-item__panel">
              <NucleicAcidSequence sequence={orf} type="rna" size={36} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TranscriptionOrfListSection(props: OrfListProps) {
  return (
    <Section title="Open Reading Frames" subtitle="Parts of the transcribed mRNA that can be translated" variant="dark">
      <OrfListItems orfList={props.orfList} orfIndex={props.orfIndex} setOrf={props.setOrf} />
    </Section>
  );
}

