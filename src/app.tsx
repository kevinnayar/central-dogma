import * as React from 'react';
import { useState } from 'react';
import { convertBaseDnaToRna, convertBaseRnaToDna, translateRnaSequenceToFrames } from '../utils/baseUtils';

import { Header } from './components/Header/Header';
import { FormToggle, Form } from './components/Form/Form';
import { Selector } from './components/Selector/Selector';
import { Viz } from './components/Viz/Viz';

// export default function App() {
  // const [formVisible, toggleFormVisibility] = useState(true);

  // const [dnaSequence, setDnaSequence] = useState(
  //   [
  //     'TACAAAAAGAATAACAGAAGGAGTAGCATAATGACAACGACCGAAGAG',
  //     'GATGACGGAGGGGGTGGCGTAGTGGTTGTCGCAGCGGCTGCCTAATAG',
  //     'TATTGATGGTGTTGCTTATTGTTTTTCTCATCGTCTTCCCAACAGCAT',
  //     'CACCGACGGCGTCGCCTACTGCTTCTCCCACCGCCTCCCATTATCACT',
  //   ].join('')
  // );
  // const [rnaSequence, setRnaSequence] = useState(
  //   [
  //     'AUGUUUUUCUUAUUGUCUUCCUCAUCGUAUUACUGUUGCUGGCUUCUC',
  //     'CUACUGCCUCCCCCACCGCAUCACCAACAGCGUCGCCGACGGAUUAUC',
  //     'AUAACUACCACAACGAAUAACAAAAAGAGUAGCAGAAGGGUUGUCGUA',
  //     'GUGGCUGCCGCAGCGGAUGACGAAGAGGGUGGCGGAGGGUAAUAGUGA',
  //   ].join('')
  // );

  // const frames = translateRnaSequenceToFrames(rnaSequence);

  // const [frame, setFrame] = useState(null);

  // const updateDnaSequence = (dna: string) => {
  //   const rna = [...dna].map(convertBaseDnaToRna).join('');
  //   setDnaSequence(dna);
  //   setRnaSequence(rna);
  // };

  // const updateRnaSequence = (rna: string) => {
  //   const dna = [...rna].map(convertBaseRnaToDna).join('');
  //   setRnaSequence(rna);
  //   setDnaSequence(dna);
  // };

  // return (
  //   <div className="app">
  //     <Header title="The Central Dogma of Molecular Biology" />
  //     <div className="main">
  //       <FormToggle formVisible={formVisible} toggleFormVisibility={toggleFormVisibility} />
  //       <Form
  //         formVisible={formVisible}
  //         dnaSequence={dnaSequence}
  //         rnaSequence={rnaSequence}
  //         updateDnaSequence={updateDnaSequence}
  //         updateRnaSequence={updateRnaSequence}
  //       />
  //       <Selector title="Select the open reading frame" frames={frames} />
  //       <Viz dnaSequence={dnaSequence} rnaSequence={rnaSequence} />
  //     </div>
  //   </div>
  // );
// }

export default class App extends React.Component<{}, {}> {
  postMessageHandler = (event: any) => {
    if (event.origin !== window.location.origin) {
      const { type, error  } = event.data;
      console.log({ type, ...(error ? { error } : {}) });
    }
  };

  onLoadHandler = () => {
    window.addEventListener('message', this.postMessageHandler, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('message', this.postMessageHandler);
  };

  render() {
    const token =
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlY29hOnN0dWR5X2d1aWQiOiJzdHVkeV9hNjQyNTE5MS01Y2I5LTRlODUtYjM4YS1jYTk0NTZmMGJiZjciLCJlY29hOmFjdG9yX3R5cGUiOiJzdWJqZWN0IiwiZWNvYTphY3Rvcl9pZCI6Imd1aWQ6c3ViamVjdF9mYmY0ZDliMS02ZDA5LTQ0N2UtODJiNS1kMzUxZmM0NWY1NDYiLCJlY29hOmxvY2FsZXMiOlsiZW5VUyIsImVuIl0sImVjb2E6c2NoZWR1bGUiOiJlcHJvIiwiZWNvYTpyZWFkb25seSI6ZmFsc2UsImVjb2E6aW5qZWN0aW9ucyI6e30sImlhdCI6MTYxMTYwMzQzOCwiZXhwIjoxNjExNjI1MDM4LCJhdWQiOiJlY29hOmRldiIsImlzcyI6Imlzc3Vlcl8wOWUxMDQxMC1hNjA1LTRhODctOTM4NC1mMjYyNjIwOWUyMDUiLCJzdWIiOiJndWlkOnN1YmplY3RfZmJmNGQ5YjEtNmQwOS00NDdlLTgyYjUtZDM1MWZjNDVmNTQ2In0.lDzxy6Tt0NRRvBhhyDdTKrm8ZntnrFQwUJoiq2BCGUaBO06EIRTFyYW1itoCZ0iLn-TMXmKKr10QPWGtz0CfMw';

    const url = `http://localhost:9011//#token=${token}`;

    return (
      <div style={{ background: 'lightblue', height: '100%', width: '100%' }}>
        <iframe
          onLoad={this.onLoadHandler}
          frameBorder={0}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            margin: 0,
            left: 0,
            top: 0,
            background: 'transparent',
          }}
          title="embed-test"
          id="embed-test"
          src={url}
        />
      </div>
    );
  }
}






