interface IHeaderProps {
    text: string;
    color?: string;
}


export default function SecondaryHeader(props: IHeaderProps) {
    const { text, color = "white" } = props;
    return <h2 style={{ color }}> {text} </h2>;
}