import styled from '@emotion/styled';

export const Row = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

export const ToggleSpeechButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;