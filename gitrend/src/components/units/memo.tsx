import React, { useState, useEffect } from 'react';
import * as S from './memo.styles'

interface MemoProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

export default function Memo({ isVisible, toggleVisibility }: MemoProps): JSX.Element {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const savedContent = localStorage.getItem('memoContent');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        localStorage.setItem('memoContent', newContent);
    };

    const handleClear = () => {
        setContent('');
        localStorage.removeItem('memoContent');
    };

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