import { useEffect, useRef, useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const useSpeechRecognition = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');

  const startRecording = () => {
    setRecognizedText('');
    recognition.current = new SpeechRecognition();

    recognition.current.continuous = true;
    recognition.current.lang = 'en-US';
    recognition.current.interimResults = false;
    recognition.current.maxAlternatives = 1;

    recognition.current.start();

    recognition.current.onend = () => {
      recognition.current = null;
      setRecording(false);
    };

    recognition.current.onresult = (event) => {
      console.log(event.results);
      const { transcript } = event.results[event.results.length - 1][0];
      setRecognizedText(transcript);
    };
    setRecording(true);
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      recognition.current = null;
    }
    setRecording(false);
  };

  // effect to stop the recording if the component is removed
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return {
    startRecording,
    stopRecording,
    recording,
    recognizedText,
  };
};

export default useSpeechRecognition;
