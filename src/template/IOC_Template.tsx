import type { FC } from "hono/jsx";
import type { ReceiptTemplate } from "../validators/template";

const IOCReceipt: FC<ReceiptTemplate> = ({
	customer,
	fuelStation,
	transaction,
}) => {
	return (
		<div class="receipt w-[300px] mx-auto p-2 font-press text-[11px] leading-tight text-black">
			<img
				src={fuelStation.logoSrc}
				alt="Fuel Station Logo"
				class="mx-auto w-[100px] h-[100px] object-contain mb-1 mix-blend-multiply contrast-200"
			/>

			<div class="text-center font-bold uppercase">{fuelStation.name}</div>
			<div class="text-center">{fuelStation.address}</div>

			<div class="flex justify-between">
				<span>Bill No:</span>
				<span>{fuelStation.receiptNumber}-ORGN</span>
			</div>

			<div class="flex justify-between">
				<span>Trans. ID:</span>
				<span>{transaction.number}</span>
			</div>

			<div class="flex justify-between">
				<span>Attnd. ID:</span>
				<span></span>
			</div>

			<div class="flex justify-between mb-1">
				<span>Receipt:</span>
				<span>Physical Receipt</span>
			</div>

			<div class="flex justify-between">
				<span>Name:</span>
				<span>{customer.name}</span>
			</div>

			<div class="flex justify-between">
				<span>Vehi. No:</span>
				<span>{customer.vehicle_number}</span>
			</div>

			<div class="flex justify-between mb-1">
				<span>Mob. No:</span>
				<span>{customer.mobile_number}</span>
			</div>

			<div class="flex justify-between">
				<span>Date:</span>
				<span>{transaction.date}</span>
			</div>

			<div class="flex justify-between mb-1">
				<span>Time:</span>
				<span>{transaction.time}</span>
			</div>

			<div class="flex justify-between">
				<span>FP. ID:</span>
				<span>{fuelStation.pumpNumber}</span>
			</div>

			<div class="flex justify-between">
				<span>Nozl No:</span>
				<span>{fuelStation.nozzleNumber}</span>
			</div>

			<div class="flex justify-between">
				<span>Fuel:</span>
				<span>{customer.vehicle_type}</span>
			</div>

			<div class="flex justify-between">
				<span>Preset:</span>
				<span>NON PRESET</span>
			</div>

			<div class="flex justify-between font-bold">
				<span>Rate:</span>
				<span>{transaction.rate}</span>
			</div>

			<div class="flex justify-between font-bold">
				<span>Sale:</span>
				<span>{transaction.amount}</span>
			</div>

			<div class="flex justify-between font-bold mb-1">
				<span>Volume:</span>
				<span>{transaction.volume} L</span>
			</div>

			<div class="text-center mt-2">THANK YOU</div>

			<div class="text-center">VISIT AGAIN</div>
		</div>
	);
};

export default IOCReceipt;
