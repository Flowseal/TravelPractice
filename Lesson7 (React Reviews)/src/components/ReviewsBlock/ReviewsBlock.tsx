import "./ReviewsBlock.css"
import { Review as ReviewData } from "../../review"
import Review from "../Review/Review";

type ReviewsBlockProps = {
    reviews: ReviewData[];
};

export default function ReviewsBlock({ reviews }: ReviewsBlockProps): JSX.Element {
    if (reviews.length)
    {
        return (
            <div className="reviews-block">
                <div className="reviews">
                    {reviews.map((review, index) => (
                    <Review
                        key={index}
                        name={review.name}
                        photo={review.photo}
                        rating={review.rating}
                        text={review.text}
                    />
                    ))}
                </div>
            </div>
        )
    }
    else
    {
        return (<></>)
    }
}