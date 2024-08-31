import styled from "@emotion/styled";

const getBackgroundColor = (neighborLevel: number) => {
    switch (neighborLevel) {
        case 0:
            return '#ffffff'; // Focus된 버튼
        case 1:
            return '#5b5b5b'; // 첫 번째 이웃 버튼
        case 2:
            return '#7b7b7b'; // 두 번째 이웃 버튼
        case 3:
            return '#ababab'; // 세 번째 이웃 버튼
        default:
            return 'none'; // 기본 색상
    }
};

const getFontColor = (neighborLevel: number) => {
    switch (neighborLevel) {
        case 0:
            return '#000000'; // Focus된 버튼
        default:
            return '#ffffff'; // 기본 색상
    }
};

export const TrendingButton = styled.button<{ isActive: boolean; neighborLevel: number }>`
    margin: 5px;
    padding: 3px 5px 3px 5px;
    border: none;
    background-color: ${({ neighborLevel }) => getBackgroundColor(neighborLevel)};
    color: white;
    cursor: pointer;
    outline: ${({ isActive }) => (isActive ? '2px solid lightgray' : 'none')};
    flex: 1 0 40px;
    max-width: 120px;
    height: 72px;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    color: ${({ neighborLevel }) => getFontColor(neighborLevel)};
    border-radius: 3px;
    word-wrap: break-word; /* or overflow-wrap: break-word; */
`;