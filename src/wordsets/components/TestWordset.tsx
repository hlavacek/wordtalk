import { Wordset } from '../types';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import IconButton from '../../components/IconButton';
import useSpeechRecognition from './useSpeechRecognition';

type TestWordsetProps = {
  wordset: Wordset;
};

function TestWordset({ wordset }: TestWordsetProps) {
  const { startRecording, stopRecording, recording, recognizedText } =
    useSpeechRecognition();

  return (
    <>
      <h2>Testing wordset: {wordset.name}</h2>
      <h3>{recognizedText}</h3>
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
