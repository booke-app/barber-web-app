import WorkerSelectorInsideMultipleWorkersCalendar
    from "../WorkerSelectorInsideMultipleWorkersCalendar/WorkerSelectorInsideMultipleWorkersCalendar";
import Day from "../Day/Day";

export function DayInsideWrapperOfMultipleDays({
                                                   item,
                                                   indexOfDay
                                               }) {
    return (
        <div
            className={'flex w-full flex-row'}>
            {item.numberOfWorkers?.map((workerIndex) => <
                    div style={{
                    alignItems: "center",
                    justifyContent: "center"
                }} className={'flex w-full flex-col'}>
                    <WorkerSelectorInsideMultipleWorkersCalendar
                        indexOfWorker={workerIndex}
                        indexOfDay={indexOfDay}/>
                    <Day
                        indexOfWorkerThatTheDayRepresents={workerIndex}
                        index={indexOfDay}/>
                </div>
            )}
        </div>

    )
}
