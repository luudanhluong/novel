
import React, { useEffect, useState } from "react";
import { ChevronRight } from "react-bootstrap-icons";
import Measure from "react-measure";
const StoryDescription = ({ sid, story }) => {
    const [heightStatus, setHeightStatus] = useState(0)
    const [heightValue, setHeightValue] = useState(0) 
    const handleMeasure = (contentRect) => {
        setHeightValue(contentRect.bounds.height)
    };
    useEffect(() => {
        setHeightValue(0)
        setHeightStatus(0)
    }, [sid, story])
    return (
        <>
            <Measure bounds onResize={handleMeasure}>
                {({ measureRef }) => (
                    <p className={`${heightStatus === 1 ? "" : heightValue < 68 ? "" : "over_content"} m-0`} style={{ height: `${heightValue < 68 ? "auto" : heightStatus === 1 ? "auto" : "68px"}` }} ref={measureRef} >{story.description}</p>
                )}
            </Measure>
            {
                heightStatus === 0 ? (
                    heightValue < 68 ? "" : <span onClick={() => setHeightStatus(1)} className="text-info read_more custom-cursor">Xem thêm<ChevronRight size={14} /></span>
                ) : ""
            }
        </>
    );
}

export default StoryDescription;