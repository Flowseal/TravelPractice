import "./NewReview.css"
import Criteria from "../Criteria/Criteria";
import { CSSProperties, useState } from "react";

type NewReviewProps = {
    criteriasNames: string[];
    onNewReview: (rating: number, text: string) => void;
};

export default function NewReview({ criteriasNames, onNewReview }: NewReviewProps): JSX.Element {
    const [textAreaHeight, setTextAreaHeight] = useState<number | null>(null);
    const textAreaStyles: CSSProperties = {
        "height": textAreaHeight ? textAreaHeight + 'px' : 'auto'
    };

    const baseCriterias: { [name: string] : number; } = {}
    criteriasNames.forEach(criteria => {
        baseCriterias[criteria] = 1;
    });

    const [criteriasRating, setCriteriaRating] = useState<{
        [name: string]: number;
    }>(baseCriterias);

    const handleRatingChange = (label: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setCriteriaRating({
          ...criteriasRating, [label]: newValue
        });
    };

    const [text, setText] = useState("");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setTextAreaHeight(event.target.scrollHeight);
    };

    const clearForm = () => {
        setCriteriaRating(baseCriterias);
        setText("");
        
        let textArea = (document.getElementsByClassName("textarea")[0] as HTMLTextAreaElement);
        textArea.style.height = textArea.style.minHeight;
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    {
        event.stopPropagation();
        onNewReview(rating, text);
        clearForm();
    };

    let rating = 0;
    Object.keys(criteriasRating).forEach(criteria => {
        rating += criteriasRating[criteria];
    })
    rating /= 5;

    return (
        <div className="new-review">
            <span className="new-review__label">How nice was my reply?</span>
            <div className="new-review__rating">
                <div className="rating__criterias">
                    {Object.keys(criteriasRating).map((criteria, index) => (
                        <Criteria 
                            key={index}
                            label={criteria}
                            value={criteriasRating[criteria]}
                            onChange={handleRatingChange}
                        />
                    ))}
                </div>
                <div>
                    <span className="rating__score">{rating}/5</span>
                </div>
            </div>
            <div className="new-review__form">
                <textarea 
                    name="reply-textarea"
                    className="textarea"
                    style={textAreaStyles}
                    value={text}
                    placeholder="What could we improve?"
                    onChange={(e) => handleTextChange(e)}
                />
                <button 
                    name="reply-button"
                    className="button"
                    onClick={(e) => handleButtonClick(e)}
                >
                Send
                </button>
            </div>
        </div>
    )
}