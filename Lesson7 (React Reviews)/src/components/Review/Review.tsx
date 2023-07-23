import "./Review.css"

export type ReviewProps = {
    name: string;
    photo: string;
    rating: number;
    text: string;
};

export default function Review({ name, photo, rating, text }: ReviewProps): JSX.Element {
    return (
        <div className="review">
            <img src={photo} alt="Avatar" className="review__avatar" />
            <div className="review__text-block">
                <span className="text-block__author">{name}</span>
                <p className="text-block__review">{text}</p>
            </div>
            <span className="review__rating">{rating}/5</span>
        </div>
    )
}