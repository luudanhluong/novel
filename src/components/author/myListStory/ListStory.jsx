
import { memo } from "react";
import { Button, Table } from "react-bootstrap";
import { Chat, PencilSquare, PlusCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CheckBox from "../../common/custom-fileds/CheckboxField";
import category from "../../common/utilities/category";
import rateAvg from "../../common/utilities/rateAvg";
import SplitNumber from "../../SplitNumber";
import Time from "../../UpdateTime";

const ListSotry = (props) => {
    const { listStories = [], listFollows = [], listCategories = [], listRate = [] } = props;
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Tên truyện</th>
                    <th>Thể loại</th>
                    <th>Ngày tạo</th>
                    <th>Lượt đọc</th>
                    <th>Theo dõi</th>
                    <th>Đánh giá</th>
                    <th>Hoàn thành</th>
                    <th>Kích hoạt</th>
                    <th colSpan={3}>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {
                    listStories.map((story, index) => (
                        <tr key={story.id}>
                            <td className="align-middle text-center">{index + 1}</td>
                            <td className="align-middle text-center">{story.name}</td>
                            <td className="align-middle text-center">{category(listCategories, story)}</td>
                            <td className="align-middle text-center">{Time(story.createDate)}</td>
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
                            <td className="align-middle text-center">{rateAvg(listRate.filter(rate => rate.storyId === story.id))}</td>
                            <td className="align-middle text-center">
                                <CheckBox name="category" required={false} disabled={story.status !== "Đang cập nhật"} checked={story.status !== "Đang cập nhật"} />
                            </td>
                            <td className="text-center align-middle">
                                <CheckBox name="category" required={false} disabled={true} checked={true} />
                            </td>
                            <td className="text-center align-middle">
                                <Link to={`/author/addeditstory?sid=${story.id}`}><PencilSquare color="black" className="pb-1" size={22} /></Link >
                            </td>
                            <td className="text-center align-middle">
                                <Link ><PlusCircle color="black" className="pb-1" size={22} /></Link >
                            </td>
                            <td className="text-center align-middle">
                                <Link to={`/author/mystory/feedback/${story.id}`} ><Chat color="black" className="pb-1" size={22} /></Link >
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default ListSotry;