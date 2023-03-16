import { useMemo } from "react";

function Container({ children, title, switchState }) {
	const [isTrigger, setIsTrigger] = switchState;

	function generateId() {
		let text = "switch-";
		const randomNumber = Math.random().toFixed(5).split(".")[1];
		return text + randomNumber;
	}

	const idSwitch = useMemo(generateId, []);

	return (
		<div className="p-[8px] pt-0 mb-[24px] rounded-[4px] shadow-style-2">
			<header className="flex justify-between py-[6px] border-b-[1px]">
				<h1 className="text-[16px] font-bold">{title}</h1>
				<button>
					<input
						id={idSwitch}
						type="checkbox"
						className="switch-checkbox"
						hidden
						checked={isTrigger}
						onChange={() => setIsTrigger(!isTrigger)}
					/>
					<label htmlFor={idSwitch} className="switch-label"></label>
				</button>
			</header>
			<div className="mt-[16px] text-justify leading-[18px]">{children}</div>
		</div>
	);
}

export default Container;
