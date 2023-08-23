
const category = (categories, story) => {
    let storyCategory = "";
    if (typeof story.categoryId !== 'undefined') {
        categories.map(category => {
            return story.categoryId.map((s, i) => {
                if (category.id === s && i < story.categoryId.length - 1) {
                    storyCategory += category.name + ", "
                } else if (category.id === s && i < story.categoryId.length) {
                    storyCategory += category.name
                }
                return storyCategory;
            });
        });
    }
    return storyCategory;
}

export default category;