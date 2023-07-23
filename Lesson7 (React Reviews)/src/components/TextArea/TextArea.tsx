import "./TextArea.css"

type TextAreaProps = {
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({ name, value, placeholder, onChange }: TextAreaProps): JSX.Element {
    return (
        <textarea 
            name={name}
            className="textarea"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}