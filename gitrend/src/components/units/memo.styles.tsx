import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

export const MemoContainer = styled.div<{ isVisible: boolean, darkMode: boolean }>`
    position: fixed;
    top: 10%;
    left: 0;
    width: 300px;
    height: 77%;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    border: 1px solid black;
    padding: 10px;
    z-index: 1000;
    animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.5s forwards;
`;

export const TextArea = styled.textarea<{ darkMode: boolean }>`
    font-family: 'Noto Sans Korean', sans-serif;
    width: 100%;
    height: calc(100% - 40px);
    font-size: 25px;
    font-weight: bold;
    resize: none;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
    width: 90%;
`;

export const DeleteButton = styled.button`
    font-family: 'Noto Sans Korean', sans-serif;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid grey;
    border-radius: 5px;
    background: lightgrey;
`;

export const SpeechButton = styled.button<{ isRecognizing: boolean }>`
    margin-right: 15px;
    font-family: 'Noto Sans Korean', sans-serif;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid grey;
    border-radius: 5px;
    background: lightgrey;
    ${({ isRecognizing }) => isRecognizing && css`
        @keyframes blinkAnimation {
            0%, 100% {
                background-color: lightgrey;
            }
            50% {
                background-color: #3366FF;
            }
        }
        animation: blinkAnimation 1.5s infinite;
    `}
    color: black;
`;

export const ToggleButton = styled.button<{ isMemoVisible: boolean, darkMode: boolean }>`
    position: fixed;
    top: 10%;
    left: ${({ isMemoVisible }) => (isMemoVisible ? '320px' : '0px')};
    z-index: 1001;
    transition: left 0.5s ease;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 15px;
    font-weight: bolder;
    cursor: pointer;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;