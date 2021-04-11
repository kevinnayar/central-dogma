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
        if (!orf.length) return null;
        return (
          <div key={orf} className="orf-list__item">
            <div
              className={`orf-list__selector ${orfIndex === index ? 'selected' : ''}`}
              onClick={() => {
                setOrfIndex(index);
                const selectedOrf = props.orfList[index];
                props.setOrf(selectedOrf);
              }}
            />
            <div className="section__panel">
              <NucleicAcidSequence sequence={orf} type="rna" width={props.width} height={props.height} />
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


