import styled from "@emotion/styled";

const getBackgroundColor = (neighborLevel: number) => {
    switch (neighborLevel) {
        case 0:
            return '#ffff00'; // Focus된 버튼
        case 1:
            return '#5555FF'; // 첫 번째 이웃 버튼
        case 2:
            return '#9999FF'; // 두 번째 이웃 버튼
        case 3:
            return '#CCCCFF'; // 세 번째 이웃 버튼
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
    max-width: 150px;
    height: 95px;
    text-align: center;
    font-size: 23px;
    font-weight: bolder;
    color: ${({ neighborLevel }) => getFontColor(neighborLevel)};
    border-radius: 5px;
    word-wrap: break-word; /* or overflow-wrap: break-word; */
`;