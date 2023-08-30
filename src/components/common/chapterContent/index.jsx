import { PencilSquare, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, setContentValue, setUpdate, updateContentValue } from "../data/dataContent/dataSlice";

const Content = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content.content);
    const chapter = useSelector(state => state.listChapter.chapter); 
    const handleUpdate = (p, i) => {
        dispatch(setContentValue({value: p, index: i})); 
    }
    return (
        <p className="lh-sm">
            {
                typeof content !== "undefined" && Object.keys(content).length !== 0 ?
                    (
                        content.paragraph.map((p, i) => (
                            <span key={i}>
                                <br />
                                {p.includes("'")?p.replaceAll(/'/g, '"'): p}
                                {
                                    chapter && chapter.active === 0
                                        ? (
                                            <>
                                                <X size={28} onClick={() => dispatch(deleteIndex({ index: i, contentId: content.id }))} />
                                                <PencilSquare size={20} onClick={() => handleUpdate(p, i)} />
                                            </>
                                        ) : ""
                                }
                                <br />
                            </span>
                        ))
                    ) : ""
            }
        </p>
    );
}

export default Content;