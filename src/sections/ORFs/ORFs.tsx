import * as React from 'react';
import { useState } from 'react';
import { Section } from '../../components/Section/Section';
import { Button } from '../../components/Button/Button';
import { NucleicAcidSequence } from '../../components/NucleicAcidSequence/NucleicAcidSequence';
import { OrfList } from '../../../types/baseTypes';
import { getLongestORFIndex } from '../../../utils/baseUtils'

type Props = {
  orfList: OrfList;
  orfIndex: number;
  width: number;
  height: number;
  setOrf: (orf: string) => void;
};

function OrfListItems(props: Props) {
  const [orfIndex, setOrfIndex] = useState(props.orfIndex);

  return (
    <div className="orf-list">
      {props.orfList.map((orf, index) => {
        const isDisabled = !orf.length;
        return (
          <div key={orf} className="orf-list__item">
            <p className="orf-list__title">
              {index < 3 ? `5'3'` : `3'5'`} Frame {index < 3 ? index + 1 : index - 2}
            </p>
            <div className="orf-list__content">
              <div
                className={`orf-list__selector ${
                  orfIndex === index ? 'selected' : ''
                } ${isDisabled ? 'disabled' : ''}`}
                onClick={() => {
                  if (!isDisabled) {
                    setOrfIndex(index);
                    const selectedOrf = props.orfList[index];
                    props.setOrf(selectedOrf);
                  }
                }}
              />
              <div className="section__panel">
                {!isDisabled ? (
                  <NucleicAcidSequence
                    sequence={orf}
                    type="rna"
                    width={props.width}
                    height={props.height}
                  />
                ) : (
                  <p>Incomplete or nonexistent open reading frame</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <Button
        text="Select the longest ORF" 
        onClick={() => {
          const index = getLongestORFIndex(props.orfList);
          setOrfIndex(index);
          const selectedOrf = props.orfList[index];
          props.setOrf(selectedOrf);
        }}
      />
    </div>
  );
}

export function ORFsSection(props: Props) {
  const title = 'Open Reading Frames';
  const subtitle = 'Select the part of the mRNA that can be translated (typically the longest).';
  const variant = 'dark';
  return (
    <Section title={title} subtitle={subtitle} variant={variant}>
      <OrfListItems
        orfList={props.orfList}
        orfIndex={props.orfIndex}
        setOrf={props.setOrf}
        width={props.width}
        height={props.height}
      />
    </Section>
  );
}


