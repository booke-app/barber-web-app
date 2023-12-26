import {styles} from "../Day/styles";
import dayjs from "dayjs";
import {useEffect, useState} from "react";

const RedLineThatShowsTheTime = ({
                                     index,
                                     indexOfWorkerThatTheDayRepresents
                                 }) => {
    const [updateRedLine, setUpdateRedLine] = useState(dayjs(Date.now()).format('mm'))
    useEffect(() => {
        setInterval(() => {
            if (updateRedLine === dayjs(Date.now()).format('mm')) {
                setUpdateRedLine(dayjs(Date.now()).format('mm'))
            }
        }, 1000)

    }, [])
    return (<div
        key={updateRedLine}
        style={
            {
                ...styles.currentTimeWrapper,
                top: `${((dayjs(Date.now()).format('HH') * 120) + (dayjs(Date.now()).format('mm') * 2.6))}px`,
            }
        }>
        {index === 0 && !indexOfWorkerThatTheDayRepresents &&
            <span style={{
                fontSize: 12,
                height: 0, color: "red",
                border: '1px red solid ',
                // padding: 2,
                borderRadius: 10,
            }}>{(dayjs(Date.now()).format('HH'))}:{(dayjs(Date.now()).format('mm'))}</span>}

        <div style={{
            height: 0,
            width: '100%',
            border: '1px solid red'
        }}></div>
    </div>)
}


export default RedLineThatShowsTheTime
