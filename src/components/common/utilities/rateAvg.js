const rateAvg = (rateStories) => {
    let results = 0;
    let avgRate = 0
    if (rateStories.length >= 1) {
        let totalRate = rateStories.reduce((accumulator, rateStory) => {
            accumulator += parseInt(rateStory.rateNo);
            return accumulator;
        }, 0)
        avgRate = totalRate / rateStories.length 
    } 
    return avgRate;
}

export default rateAvg;