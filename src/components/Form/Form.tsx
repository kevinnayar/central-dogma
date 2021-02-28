import * as React from 'react';
import { useState, useEffect } from 'react';

type FormToggleProps = {
  formVisible: boolean;
  toggleFormVisibility: (t: boolean) => void;
};

export function FormToggle(props: FormToggleProps) {
  const { formVisible, toggleFormVisibility } = props;
  return (
    <div className="toggle">
      <i
        className="material-icons toggle__btn"
        onClick={() => toggleFormVisibility(!formVisible)}
      >
        {formVisible ? 'expand_less' : 'expand_more'}
      </i>
    </div>
  );
}

type FormHeaderProps = {
  title: string;
  description: string;
  explanation: any;
};

function FormHeader(props: FormHeaderProps) {
  return (
    <div className="form__section__header">
      {props.explanation}
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

type FormBodyProps = {
  title: string;
  sequence: string;
  onUpdateSequence: (s: string) => void;
};

function FormBody(props: FormBodyProps) {
  const [sequence, setSequence] = useState(props.sequence);

  const updateSequence = (e: any) => {
    e.preventDefault();
    setSequence(e.target.value);
  }

  const commitSequence = (e: any) => {
    e.preventDefault();
    props.onUpdateSequence(sequence);
  }

  useEffect(() => {
    if (props.sequence !== sequence) setSequence(props.sequence);
  }, [props.sequence]);

  return (
    <div className="form__section__body">
      <label>{props.title}</label>
      <textarea value={sequence} onChange={updateSequence} />
      <button onClick={commitSequence}>Update</button>
    </div>
  );
}

type FormProps = {
  formVisible: boolean;
  dnaSequence: string;
  rnaSequence: string;
  updateDnaSequence: (dna: string) => void;
  updateRnaSequence: (rna: string) => void;
};

export function Form(props: FormProps) {
  const { dnaSequence, rnaSequence, updateDnaSequence, updateRnaSequence } = props;
  return (
    <div className={`form ${props.formVisible ? 'visible' : 'hidden'}`}>
      <div className="form__sections">
        <div className="form__section">
          <FormHeader
            title="Transcription"
            description="The process of making an RNA copy of a gene sequence"
            explanation={<h4>DNA <span>→</span> mRNA</h4>}
          />
          <FormBody
            title="DNA Template Strand"
            sequence={dnaSequence}
            onUpdateSequence={updateDnaSequence}
          />
        </div>
        <div className="form__section">
          <FormHeader
            title="Translation"
            description="The process of translating mRNA to a sequence of amino acids"
            explanation={<h4>mRNA <span>→</span> Protein</h4>}
          />
          <FormBody
            title="mRNA Transcribed Strand"
            sequence={rnaSequence}
            onUpdateSequence={updateRnaSequence}
          />
        </div>
      </div>
    </div>
  );
}