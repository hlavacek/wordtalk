import { Wordset } from '../types';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import IconButton from '../../components/IconButton';
import useSpeechRecognition from './useSpeechRecognition';
import { useEffect, useState } from 'react';

type Order = 'random' | 'cycle';
type TestWordsetProps = {
  wordset: Wordset;
  order: Order;
};

const generateIndex = (wordset: Wordset, order: Order, currentIndex = 0) => {
  let index = 0;
  if (order === 'random') {
    // make sure we don't pick up the same phrase
    while (index === currentIndex && wordset.tests.length > 1) {
      index = Math.random() * wordset.tests.length;
    }
  } else {
    index = (currentIndex + 1) % wordset.tests.length;
  }
  return index;
};

function TestWordset({ wordset, order = 'cycle' }: TestWordsetProps) {
  const { startRecording, stopRecording, recording, recognizedText } =
    useSpeechRecognition();
  const [testPhraseIndex, setTestPhraseIndex] = useState<number>(0);
  const [matchedCount, setMatchedCount] = useState<number>(0);

  // generate initial index
  useEffect(() => {
    setTestPhraseIndex((currentIndex) =>
      generateIndex(wordset, order, currentIndex)
    );
  }, [matchedCount, order, wordset]);

  useEffect(() => {
    const match = wordset.tests[testPhraseIndex].translations.some((phrase) =>
      recognizedText.toLowerCase().endsWith(phrase.toLowerCase())
    );

    if (match) {
      setMatchedCount((count) => count + 1);
    }
  }, [recognizedText, testPhraseIndex, wordset.tests]);

  return (
    <>
      <h2>Testing wordset: {wordset.name}</h2>
      <h3>Test phrase: {wordset.tests[testPhraseIndex].phrase}</h3>
      <h3>{recognizedText}</h3>
      <h3>Your points: {matchedCount}</h3>
      {recording ? (
        <IconButton
          onClick={stopRecording}
          className="size-12"
          icon={<StopIcon className="size-6" />}
        />
      ) : (
        <IconButton
          onClick={startRecording}
          className="size-12"
          icon={<MicrophoneIcon className="size-6" />}
        />
      )}
    </>
  );
}

export default TestWordset;
