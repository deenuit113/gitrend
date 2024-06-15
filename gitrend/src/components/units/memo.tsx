import React, { useState, useEffect, useRef } from 'react';
import * as S from './memo.styles';
import { debounce } from 'lodash';

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
    const [isRecognizing, setIsRecognizing] = useState<boolean>(false);

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
            setIsRecognizing(false);
        };

        recognitionRef.current.onerror = (event: Event) => {
            console.error('Speech recognition error', (event as any).error);
            setIsRecognizing(false);
        };

        recognitionRef.current.onend = () => {
            setIsRecognizing(false);
        };
    }, []);

    const handleSpeechRecognition = () => {
        if (recognitionRef.current) {
            if (isRecognizing) {
                recognitionRef.current.stop();
                setIsRecognizing(false);
            } else {
                recognitionRef.current.start();
                setIsRecognizing(true);
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
            else if (isVisible && e.key === 'd') {
                handleClear();
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
                <S.ButtonContainer>
                    <S.SpeechButton
                        onClick={handleSpeechRecognition}
                        isRecognizing={isRecognizing}
                    >
                        음성 인식
                    </S.SpeechButton>
                    <S.DeleteButton onClick={handleClear}>삭제</S.DeleteButton>
                </S.ButtonContainer>
            </S.MemoContainer>
        </>
    );
}