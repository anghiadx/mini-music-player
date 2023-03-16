import RandomList from "./GeneralItems/RandomList";
import Timer from "./GeneralItems/Timer";

function General() {
	return (
		<div className="flex flex-col p-[12px] text-[14px] overflow-y-overlay">
			<RandomList />
			<Timer />
		</div>
	);
}

export default General;
