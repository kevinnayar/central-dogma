import * as React from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <div className="section__header">
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
    </div>
  );
}

function SectionBody(props: { children: any }) {
  return (
    <div className="section__body">
      {props.children}
    </div>
  );
}

type SectionProps = SectionHeaderProps & {
  variant: 'light' | 'dark';
  children: any;
};

export function Section(props: SectionProps) {
  return (
    <div className={`section section--${props.variant}`}>
      <SectionHeader {...props} />
      <SectionBody {...props} />
    </div>
  );
}