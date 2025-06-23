type Props = {
    color?: string;
}

const EndingIcon = (props: Props) => {
    const { color = '#8C93A1' } = props;
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11.5 6.91667L7.75001 11.5L6.08334 9.83334M16.7083 9.00001C16.7083 13.2572 13.2572 16.7083 9.00001 16.7083C4.74281 16.7083 1.29167 13.2572 1.29167 9.00001C1.29167 4.74281 4.74281 1.29167 9.00001 1.29167C13.2572 1.29167 16.7083 4.74281 16.7083 9.00001Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default EndingIcon;