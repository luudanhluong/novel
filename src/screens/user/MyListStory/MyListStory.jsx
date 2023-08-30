import DefaultTemplate from "../../../templates/DefaultTemplate";
import ListStory from "../../../components/author/myListStory/ListStory" 
import FetChData from "./FetchData";
const MyListStory = () => {
    FetChData();
    return (
        <DefaultTemplate>
            <ListStory />
        </DefaultTemplate>
    );
}

export default MyListStory;