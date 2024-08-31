import React, { useState, useEffect } from 'react';
import TrendingItems from './items';
import Memo from './memo';
import * as S from './page.styles';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function TrendingPage(): JSX.Element {
    const [trendingItems, setTrendingItems] = useState<{ name: string, type: 'repo' | 'topic' }[]>([]);
    const [focusedText, setFocusedText] = useState<string>('');
    const [barVisible, setBarVisible] = useState(false);
    const [isMemoVisible, setIsMemoVisible] = useState(false);
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('DarkMode');
            console.log('Loaded DarkMode from localStorage:', savedDarkMode);
            if (savedDarkMode === 'night') {
                setIsDarkMode(true);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('DarkMode', isDarkMode ? 'night' : 'day');
            console.log('Saved DarkMode to localStorage:', isDarkMode ? 'night' : 'day');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                const formattedDate = `${sevenDaysAgo.getFullYear()}-${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${sevenDaysAgo.getDate().toString().padStart(2, '0')}`;

                const repoResponse = await fetch(`https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc`);
                const repoData = await repoResponse.json();
                const repoItems = repoData.items.map((item: any) => ({ name: item.full_name, type: 'repo' as const }));

                const languageTopicResponse = await fetch('https://api.github.com/search/topics?q=language');
                const languageTopicData = await languageTopicResponse.json();
                const languageTopicItems = languageTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const frameworkTopicResponse = await fetch('https://api.github.com/search/topics?q=framework');
                const frameworkTopicData = await frameworkTopicResponse.json();
                const frameworkTopicItems = frameworkTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const libraryTopicResponse = await fetch('https://api.github.com/search/topics?q=library');
                const libraryTopicData = await libraryTopicResponse.json();
                const libraryTopicItems = libraryTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const algoTopicResponse = await fetch('https://api.github.com/search/topics?q=algorithm');
                const algoTopicData = await algoTopicResponse.json();
                const algoTopicItems = algoTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                setTrendingItems([
                    ...repoItems,
                    ...languageTopicItems,
                    ...frameworkTopicItems,
                    ...libraryTopicItems,
                    ...algoTopicItems
                ]);

            } catch (error) {
                console.error('Error fetching trending data:', error);
            }
        };

        fetchTrendingData();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isTextAreaFocused) {
                if (e.key === 't') {
                    setBarVisible(prev => !prev);
                } else if (e.key === 'm') {
                    setIsMemoVisible(prev => !prev);
                } else if (e.key === 's') {
                    setSpeechEnabled(prev => !prev);
                } else if (e.key === 'd') {
                    setIsDarkMode(prev => !prev);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isTextAreaFocused]);

    const toggleMemoVisibility = () => {
        setIsMemoVisible(prev => !prev);
    };

    const onClickFocusedText = (): void => {
        setBarVisible(prev => !prev);
    };

    return (
        <S.TrendingTopicContainer 
            aria-label="github trending topics"
            role="container"
            darkMode={isDarkMode}
        >
            <S.TrendingTopicTitle>Github Trending Topics</S.TrendingTopicTitle>
            <S.ToggleContainer>
                <Switch
                    onChange={() => setSpeechEnabled(prev => !prev)}
                    checked={speechEnabled}
                    offColor="#888"
                    onColor="#0d6efd"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={30}
                    width={50}
                    aria-label="텍스트 음성변환 스위치"
                    role="switch"
                />
                <FontAwesomeIcon icon={faBullhorn} style={{ marginLeft: '10px', marginRight: '20px', color: speechEnabled ? '#0d6efd' : '#888' }} />
                <Switch
                    onChange={() => setIsDarkMode(prev => !prev)}
                    checked={isDarkMode}
                    offColor="#888"
                    onColor="#0d6efd"
                    uncheckedIcon={<FontAwesomeIcon icon={faSun} style={{ color: 'yellow', padding: '5px' }} />}
                    checkedIcon={<FontAwesomeIcon icon={faMoon} style={{ color: 'white', padding: '5px' }} />}
                    height={30}
                    width={50}
                    aria-label="다크모드 스위치"
                    role="switch"
                />
            </S.ToggleContainer>
            <S.ScrollContainer
                aria-label="해당 사이트로 이동할 수 있는 버튼 container"
                role="container"
                >
                <TrendingItems 
                    items={trendingItems}
                    setFocusedText={setFocusedText}
                    isTextAreaFocused={isTextAreaFocused}
                    speechEnabled={speechEnabled}
                />
            </S.ScrollContainer>
            <S.FocusedTextContainer
                visible={barVisible}
                darkMode={isDarkMode}
                onClick={onClickFocusedText}
                aria-label="확대된 글자가 출력되는 container"
                role="container"
                >
                <S.FocusedText
                    darkMode={isDarkMode}
                    aria-label="확대된 글자"
                    role="text"
                    >
                    {focusedText}</S.FocusedText>
            </S.FocusedTextContainer>
            <S.ToggleMessage 
                visible={!barVisible}
                darkMode={isDarkMode}
                onClick={onClickFocusedText}
                aria-label="확대된 글자를 위한 도움말 container & text"
                role="container & text"
            >
                T 키를 눌러 텍스트를 크게 보세요!
            </S.ToggleMessage>
            <Memo 
                isVisible={isMemoVisible} 
                toggleVisibility={toggleMemoVisibility}
                isTextAreaFocused={isTextAreaFocused}
                setIsTextAreaFocused={setIsTextAreaFocused}
                isDarkMode={isDarkMode}
            />
        </S.TrendingTopicContainer>
    );
}