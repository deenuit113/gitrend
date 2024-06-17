import React, { useState, useEffect, useRef } from 'react';
import * as S from './memo.styles';
import { debounce } from 'lodash';

//@ts-ignore
type SpeechRecognition = typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition;
type SpeechRecognitionEvent = Event & { results: { [key: number]: { [key: number]: { transcript: string } } } };

interface MemoProps {
    isVisible: boolean;
    toggleVisibility: () => void;
    isTextAreaFocused: boolean;
    setIsTextAreaFocused: (focused: boolean) => void;
    isDarkMode: boolean;
}

export default function Memo({ isVisible, toggleVisibility, isTextAreaFocused, setIsTextAreaFocused, isDarkMode }: MemoProps): JSX.Element {
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
            if (isVisible && !isTextAreaFocused) {
                if (e.key === 'v') {
                    handleSpeechRecognition();
                } else if (e.key === 'c') {
                    handleClear();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, isTextAreaFocused]);

    const handleTextAreaFocus = () => {
        setIsTextAreaFocused(true);
    };

    const handleTextAreaBlur = () => {
        setIsTextAreaFocused(false);
    };

    return (
        <>
            <S.ToggleButton
                onClick={toggleVisibility}
                isMemoVisible={isVisible}
                darkMode={isDarkMode}
                aria-label="메모장을 꺼내고 넣을 수 있는 토글 버튼"
                >
                {isVisible ? '< MEMO <' : '> MEMO >'}
            </S.ToggleButton>
            <S.MemoContainer
                isVisible={isVisible}
                darkMode={isDarkMode}
                aria-label="메모장 container"
                role="container"
                >
                <S.TextArea 
                    value={content} 
                    onChange={handleChange} 
                    onFocus={handleTextAreaFocus}
                    onBlur={handleTextAreaBlur}
                    darkMode={isDarkMode}
                    aria-label="메모 입력창"
                />
                <S.ButtonContainer
                    aria-label="메모장에 사용되는 버튼이 있는 container"
                    role="container"
                    >
                    <S.SpeechButton
                        onClick={handleSpeechRecognition}
                        isRecognizing={isRecognizing}
                        aria-label="음성 인식 On/Off 버튼"
                    >
                        음성 인식
                    </S.SpeechButton>
                    <S.DeleteButton
                        onClick={handleClear}
                        aria-label="메모장 내용 삭제 버튼"
                    >
                        삭제
                    </S.DeleteButton>
                </S.ButtonContainer>
            </S.MemoContainer>
        </>
    );
}