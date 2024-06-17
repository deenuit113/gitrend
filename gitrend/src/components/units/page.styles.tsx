import styled from "@emotion/styled";

export const TrendingTopicContainer = styled.div<{ darkMode: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fffffa')};
    box-sizing: border-box;
    overflow-y: hidden;
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
`;

export const TrendingTopicTitle = styled.h1`
    width: 80%;
    height: 5%;
    text-align: center;
    align-items: center;
`

export const ScrollContainer = styled.div`
    width: 100%;
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid lightgrey;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 6px;
        transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 12px;
        }
    }
`;

export const FocusedTextContainer = styled.div<{ visible: boolean, darkMode: boolean }>`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#222' : '#f0f0f0')};
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(100%)')};
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
    position: absolute;
    bottom: 0;
    z-index: 1;
`;

export const FocusedText = styled.div<{ darkMode: boolean }>`
    font-size: 2.7em;
    font-weight: bolder;
    color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    text-align: center;
`;

export const ToggleMessage = styled.div<{ visible: boolean, darkMode: boolean }>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#222' : '#f0f0f0')};
    color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    transition: transform 0.5s ease, opacity 0.5s ease;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
    z-index: 0;
`;

export const ToggleContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
`;