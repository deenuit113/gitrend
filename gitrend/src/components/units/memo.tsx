import React, { useState, useEffect } from 'react';

export default function Memo(): JSX.Element {
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

    return (
        <div style={{ position: 'fixed', top: '50px', left: '0', width: '300px', height: '400px', backgroundColor: 'white', border: '1px solid black', padding: '10px', zIndex: 1000 }}>
            <textarea
                value={content}
                onChange={handleChange}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}