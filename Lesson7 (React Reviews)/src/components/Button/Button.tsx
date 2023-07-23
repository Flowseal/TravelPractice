import "./Button.css"

type ButtonProps = {
    name: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ name, label, onClick }: ButtonProps): JSX.Element {
    return (
        <button 
            name={name}
            className="button"
            onClick={onClick}
        >
        {label}
        </button>
    )
}