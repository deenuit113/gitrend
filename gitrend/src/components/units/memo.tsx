import React, { useState, useEffect, useRef } from 'react';
import * as S from './memo.styles';

//@ts-ignore
type SpeechRecognition = typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition;
type SpeechRecognitionEvent = Event & { results: { [key: number]: { [key: number]: { transcript: string } } } };

interface MemoProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

export default function Memo({ isVisible, toggleVisibility }: MemoProps): JSX.Element {
    const [content, setContent] = useState<string>('');
    const recognitionRef = useRef<InstanceType<SpeechRecognition> | null>(null);
    const isRecognizingRef = useRef<boolean>(false);

    useEffect(() => {
        const savedContent = localStorage.getItem('memoContent');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    useEffect(() => {
        //@ts-ignore
        const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Browser does not support Web Speech API');
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ko-KR';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setContent((prevContent) => {
                const newContent = `${prevContent}\n${transcript}`;
                localStorage.setItem('memoContent', newContent);
                return newContent;
            });
        };

        recognitionRef.current.onerror = (event: Event) => {
            console.error('Speech recognition error', (event as any).error);
            isRecognizingRef.current = false;
        };

        recognitionRef.current.onend = () => {
            isRecognizingRef.current = false;
        };
    }, []);

    const handleSpeechRecognition = () => {
        if (recognitionRef.current) {
            if (isRecognizingRef.current) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
                isRecognizingRef.current = true;
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        localStorage.setItem('memoContent', newContent);
    };

    const handleClear = () => {
        setContent('');
        localStorage.removeItem('memoContent');
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isVisible && e.key === 'v') {
                handleSpeechRecognition();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible]);

    return (
        <>
            <S.ToggleButton onClick={toggleVisibility} isMemoVisible={isVisible}>
                {isVisible ? '< MEMO <' : '> MEMO >'}
            </S.ToggleButton>
            <S.MemoContainer isVisible={isVisible}>
                <S.TextArea value={content} onChange={handleChange} />
                <S.DeleteButton onClick={handleClear}>삭제</S.DeleteButton>
            </S.MemoContainer>
        </>
    );
}