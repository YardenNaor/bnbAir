

export function ReviewsMsg({ stay }) {

    const reviewsToDisplay = stay.reviews.slice(0,6)
    function getMonthName(monthNumber) {

        let num = monthNumber
        if (num.length > 1 && num[0] === 0) num = num[1]
        num = Number(num)
        const date = new Date();
        date.setMonth(num - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }
      
    return <section className="reviewsMsg">
        {   
            reviewsToDisplay.map((review) => {
                return <section className="reviewContant" key={review.by._id}>
                    <div className="reviewTitle">
                        <img className="reviewUserImg" src={review.by.imgUrl} />

                        <div className="reviewDetailes">
                            <span className="reviewTitleName">{review.by.fullname}</span>
                            <span className="reviewTitleMonth">{getMonthName(review.at.slice(5, 7))}</span>
                        </div>
                    </div>
                    <div className="reviewTxt">
                        {review.txt}
                    </div>
                </section>
            })

        }
    </section>
}