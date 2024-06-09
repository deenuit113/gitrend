import styled from "@emotion/styled";

export const TrendingButton = styled.button<{isActive: boolean, isNeighbor1: boolean, isNeighbor2: boolean}>`
    margin: 5px 5px 5px 5px;
    padding: 10px;
    border: ${({isActive}) => (isActive ? '2px solid red' : 'none')};
    background-color: ${({isActive, isNeighbor1, isNeighbor2}) => 
        isActive ? 'lightblue' : 
        isNeighbor1 ? 'lightgreen' : 
        isNeighbor2 ? 'lightyellow' : 
        'initial'};
    transition: background-color 0.3s;
`;