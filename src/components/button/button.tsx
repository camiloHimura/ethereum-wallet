import React from 'react';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export const Button = (props: ButtonProps) => {
  return <button onClick={() => props.onPress()}>{props.text}</button>;
};
