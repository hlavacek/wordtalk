import { Wordset } from '../types';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import IconButton from '../../components/IconButton';
import useSpeechRecognition from './useSpeechRecognition';
import { useEffect, useState } from 'react';

type Order = 'random' | 'cycle';
type TestWordsetProps = {
  wordset: Wordset;
  order?: Order;
};

const generateIndex = (wordset: Wordset, order: Order, currentIndex = 0) => {
  let index = currentIndex;
  if (order === 'random') {
    // make sure we don't pick up the same phrase
    while (index === currentIndex && wordset.tests.length > 1) {
      index = Math.floor(Math.random() * wordset.tests.length);
    }
  } else {
    index = (currentIndex + 1) % wordset.tests.length;
  }
  return index;
};

function TestWordset({ wordset, order = 'random' }: TestWordsetProps) {
  const { startRecording, stopRecording, recording, recognizedText } =
    useSpeechRecognition();
  const [testPhraseIndex, setTestPhraseIndex] = useState<number>(0);
  const [matchedCount, setMatchedCount] = useState<number>(0);

  // generate next word
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

  useEffect(() => {
    // recognize stop word
    if (recognizedText.toLowerCase().endsWith(' stop')) {
      stopRecording();
    }
  }, [recognizedText, stopRecording]);

  return (
    <>
      <h1 className="text-sm">Testing wordset: {wordset.name}</h1>
      <h3 className="text-3xl mt-4 mb-4">
        {wordset.tests[testPhraseIndex].phrase}
      </h3>
      <h3>{recognizedText}</h3>
      <h3>Your points: {matchedCount}</h3>
      {recording ? (
        <IconButton
          onClick={stopRecording}
          className="size-20 bg-turquoise-700"
          icon={<StopIcon className="size-10" />}
        />
      ) : (
        <IconButton
          onClick={startRecording}
          className="size-20"
          icon={<MicrophoneIcon className="size-10" />}
        />
      )}
    </>
  );
}

export default TestWordset;
