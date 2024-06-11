import styled from "@emotion/styled";

export const TrendingTopicContainer = styled.div`
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
    background-color: #fffffa;
    box-sizing: border-box;
`;

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