import {useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../Utilities/utilities";
import {Tooltip} from "@mui/material";

const ImageInGallery = ({imageItem}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }} className={'relative'}
             onMouseLeave={() => {
                 setIsHovered(false)
             }} onMouseOver={() => {
            setIsHovered(true)
        }}>
            <img
                className="h-auto  hover:bg-blend-darken max-w-full rounded-lg"
                src={imageItem.url}
                alt=""/>
            {isHovered && <Tooltip title={'Delete Image'}>
                <XMarkIcon onClick={() => {

                }} className={classNames(
                    'text-white absolute mr-auto ml-auto left-0 right-0 mt-auto bottom-0 top-0 mb-auto w-6 rounded bg-indigo-600 hover:bg-indigo-500 h-6 w-6 shrink-0 '
                )}/>
            </Tooltip>}
        </div>
    )
}


export default ImageInGallery
