import wordsets from '../data';
import TestWordset from './TestWordset';

function WordsetsSelection() {
  return (
    <>
      {/* {wordsets.map((ws) => (
        <span>{ws.name}</span>
      ))} */}

      <TestWordset wordset={wordsets[0]} />
    </>
  );
}

export default WordsetsSelection;
