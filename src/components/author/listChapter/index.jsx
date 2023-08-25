import { Table } from "react-bootstrap";
import { Chat, List, PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CheckBox from "../../common/custom-fileds/CheckboxField";

const ViewListChapter = () => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr className="text-center">
                    <th className="align-middle text-center">#</th>
                    <th className="align-middle text-center">Mã truyện</th>
                    <th className="align-middle text-center">Số chương</th>
                    <th className="align-middle text-center">Tên chương</th>
                    <th className="align-middle text-center">Ngày phát hành</th>
                    <th className="align-middle text-center">Kích hoạt</th>
                    <th className="align-middle text-center" colSpan={3}>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="align-middle text-center"></td>
                    <td className="align-middle text-center"></td>
                    <td className="align-middle text-center"></td>
                    <td className="align-middle text-center"></td> 
                    <td className="align-middle text-center">
                        <CheckBox name="status" required={false} disabled={false} checked={true} id={""}/>
                    </td>
                    <td className="text-center align-middle">
                        <CheckBox name="active" required={false} disabled={true} checked={true} />
                    </td>
                    <td className="text-center align-middle">
                        <Link to={"#"}><PencilSquare color={"black"} className="pb-1" size={22} /></Link >
                    </td>
                    <td className="text-center align-middle">
                        <Link to={"#"}><List color={"black"} className="pb-1" size={22} /></Link >
                    </td>
                    <td className="text-center align-middle">
                        <Link to={"#"}><Chat color="black" className="pb-1" size={22} /></Link >
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ViewListChapter;