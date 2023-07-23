import "./Criteria.css"

const sliderProgressStyle = (lineWidth: number): React.CSSProperties => ({
    position: `absolute`,
    width: lineWidth.toString() + `px`,
    height: `6px`,
    backgroundColor: `#1E64B7`,
    borderRadius: `5px`,
    transition: `width 0.25s ease-in-out`
});

type CriteriaProps = {
    label: string;
    value: number;
    onChange: (label: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Criteria({ label, value, onChange }: CriteriaProps): JSX.Element {
    const criteria_points_gap = 50;

    return (
        <div className="criteria">
            <div style={ sliderProgressStyle(criteria_points_gap * (value-1)) } />
            <div className="criteria-points">
                {Array.from(Array(5), (_, i) => {
                    return <div key={i} className={value-1 >= i ? "criteria-point active" : "criteria-point"} />
                })}
            </div>
            <input 
                type="range" 
                min="1" 
                value={value}
                max="5" 
                step="1" 
                name={label}
                className="criteria-slider"
                onChange={(e) => onChange(label, e)}
            />
            <span>{label}</span>
        </div>
    )
}