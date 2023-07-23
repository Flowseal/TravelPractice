import { useState } from "react";
import NewReview from "./components/NewReview/NewReview"; 
import ReviewsBlock from "./components/ReviewsBlock/ReviewsBlock";
import { ReviewProps } from "./components/Review/Review";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  const defaultCriteriasNames: string[] = [
    "Cleanliness",
    "Customer Service",
    "Speed",
    "Location",
    "Facilities"
  ]

  const handleNewReview = (rating: number, text: string) => {
    setReviews([
      ...reviews,
      {
        name: "Это ты",
        photo: `https://i.imgur.com/ji06EF7.png`,
        rating,
        text,
      }
    ]);
  };

  return (
    <>
      <NewReview 
        criteriasNames={defaultCriteriasNames}
        onNewReview={(rating, text) => handleNewReview(rating, text)}
      />

      <ReviewsBlock
        reviews={reviews}
      />
    </>
  );
}

export default App;