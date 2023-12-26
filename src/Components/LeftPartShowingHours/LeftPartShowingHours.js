import {styles} from "./styles";

const LeftPartShowingHours = () => {
    let arr = []


    for (let i = 0; i < 24; i++) {
        arr.push(i)
    }
    return (
        <div
            className={'leftPart'}
            style={{
                height: '2880px',
                position: "sticky",
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                zIndex: 10,
                background: "white",
                color: "gray"
            }}

        >

            {arr.map(time => <span key={time}
                                   style={{
                                       top: `${(time * 120)}px`,
                                       display: "flex",
                                       height: '100%',
                                       alignItems: "start"
                                   }}

                                   className="sticky  w-14 pr-2 text-right text-xs leading-5 text-gray-400"
            >
                {time}:00</span>)}
        </div>

    )
}

export default LeftPartShowingHours
