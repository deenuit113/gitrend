import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

export const MemoContainer = styled.div<{ isVisible: boolean }>`
    position: fixed;
    top: 50px;
    left: 0;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid black;
    padding: 10px;
    z-index: 1000;
    animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.5s forwards;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: calc(100% - 40px);
`;

export const DeleteButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

export const ToggleButton = styled.button<{ isMemoVisible: boolean }>`
    position: fixed;
    top: 50px;
    left: ${({ isMemoVisible }) => (isMemoVisible ? '320px' : '0px')};
    z-index: 1001;
    transition: left 0.5s ease;
    writing-mode: vertical-rl;
    text-orientation: upright;
`;