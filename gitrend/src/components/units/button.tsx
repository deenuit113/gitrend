interface TrendingButtonProps {
    name: string;
    type: 'repo' | 'topic'; // 'repo' 또는 'topic' 중 하나로 타입 지정
}

export default function TrendingButton(props: TrendingButtonProps): JSX.Element {
    // 클릭 이벤트 핸들러
    const handleClick = () => {
        let githubUrl = '';
        if (props.type === 'repo') {
            // 해당 레포지토리에 대한 GitHub 페이지 URL
            githubUrl = `https://github.com/${name}`;
        } else if (props.type === 'topic') {
            // 해당 토픽에 대한 GitHub 페이지 URL
            githubUrl = `https://github.com/topics/${name}`;
        }
        // 새 탭에서 GitHub 페이지 열기
        window.open(githubUrl, '_blank');
    };

    return (
        <button onClick={handleClick}>{props.name}</button>
    );
};