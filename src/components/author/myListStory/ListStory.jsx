
import { Table } from "react-bootstrap";
import { Chat, List, PencilSquare } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckBox from "../../common/custom-fileds/CheckboxField";
import { completedStory } from "../../common/data/dataStory/dataSlice";
import category from "../../common/utilities/category";
import rateAvg from "../../common/utilities/rateAvg";
import SplitNumber from "../../common/utilities/SplitNumber";
import Time from "../../UpdateTime"; 

const ListSotry = () => { 
    const listStories = useSelector(state => state.listStory.data);
    const listCategories = useSelector(state => state.listCategory.data);
    const listFollows = useSelector(state => state.listFollow.data);
    const listRate = useSelector(state => state.listRate.data); 
    return (
        <Table striped bordered size="sm">
            <thead>
                <tr className="text-center">
                    <th className="align-middle text-center">#</th>
                    <th className="align-middle text-center">Tên truyện</th>
                    <th className="align-middle text-center">Thể loại</th>
                    <th className="align-middle text-center">Ngày phát hành</th>
                    <th className="align-middle text-center">Lượt đọc</th>
                    <th className="align-middle text-center">Theo dõi</th>
                    <th className="align-middle text-center">Đánh giá</th>
                    <th className="align-middle text-center">Hoàn thành</th>
                    <th className="align-middle text-center">Kích hoạt</th>
                    <th className="align-middle text-center" colSpan={3}>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {
                    listStories.map((story, index) => (
                        <tr key={story.id}>
                            <td className="align-middle text-center">{index + 1}</td>
                            <td className="align-middle text-center">{story.name}</td>
                            <td className="align-middle text-center">{category(listCategories, story)}</td>
                            <td className="align-middle text-center">{story.publishedDate ===""? "Chưa được kích hoạt" :Time(story.publishedDate)}</td>
                            <td className="align-middle text-center">{SplitNumber(story.view)}</td>
                            <td className="align-middle text-center">
                                {
                                    listFollows.reduce((acc, follow) => {
                                        if (follow.storyId === story.id) {
                                            acc += 1;
                                        }
                                        return acc;
                                    }, 0)
                                }
                            </td>
                            <td className="align-middle text-center">{rateAvg(listRate.filter(rate => rate.rateStoryId === story.id))}</td>
                            <td className="align-middle text-center">
                                <CheckBox name="status" required={false} disabled={story.status === "Đã hoàn thành" || story.active===0} checked={story.status === "Đã hoàn thành"} id={story}  handleOnchange={completedStory} />
                            </td>
                            <td className="text-center align-middle">
                                <CheckBox name="active" required={false} disabled={true} checked={story.active===1} />
                            </td>
                            <td className="text-center align-middle">
                                <Link to={story.active === 0 ? `/author/addeditstory?sid=${story.id}` : ""} ><PencilSquare color={story.active === 0 ? "black" : "grey"} className="pb-1" size={22} /></Link >
                            </td>
                            <td className="text-center align-middle">
                                <Link to={story.status === "Đang cập nhật" ?`/author/mystory/listchapter/${story.id}`:""} ><List color={story.status === "Đang cập nhật" ? "black" : "grey"} className="pb-1" size={22} /></Link >
                            </td>
                            <td className="text-center align-middle">
                                <Link to={`/author/mystory/boxchat/${story.id}`} ><Chat color="black" className="pb-1" size={22} /></Link >
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default ListSotry;