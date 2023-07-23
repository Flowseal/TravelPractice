import "./NewReview.css"
import Criteria from "../Criteria/Criteria";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { useState } from "react";

type NewReviewProps = {
    criteriasNames: string[];
    onNewReview: (rating: number, text: string) => void;
};

export default function NewReview({ criteriasNames, onNewReview }: NewReviewProps): JSX.Element {
    let baseCriterias: { [name: string] : number; } = {}
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
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + 'px';
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
                <TextArea
                    name="reply-textarea"
                    value={text}
                    placeholder="What could we improve?"
                    onChange={(e) => handleTextChange(e)}
                />
                <Button
                    name="reply-button"
                    label="Send"
                    onClick={(e) => handleButtonClick(e)}
                />
            </div>
        </div>
    )
}