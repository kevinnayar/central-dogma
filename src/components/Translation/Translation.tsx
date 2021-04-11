import * as React from 'react';
import { useState, useEffect } from 'react';
import { Section } from '../Section/Section';
import { getBaseName, getBaseColor } from '../../../utils/baseUtils';
import { BaseSymbol, OrfList } from '../../../types/baseTypes';

function Pretitle() {
  return (
    <h4>
      mRNA <span>→</span> Protein
    </h4>
  );
}

export function TranslationResultSection(props: {}) {
  return (
    <Section
      pretitle={<Pretitle />}
      title="Translation"
      subtitle="The process of translating mRNA to a sequence of amino acids"
      variant="light">
      
    </Section>
  );
}
