import type { FC } from "hono/jsx";
import type { TReceipt } from "@/validators";

const IOCReceipt: FC<TReceipt> = ({ customer, record }) => {
	const receiptItems = [
		{
			label: "Bill No:",
			value: record.receipt_number,
		},
		{
			label: "Trans. ID:",
			value: record.id,
		},
		{
			label: "Attnd. ID:",
			value: "",
		},
		{
			label: "Receipt:",
			value: "Physical Receipt",
		},
		{
			label: "Name:",
			value: customer.customer_name,
		},
		{
			label: "Vehi. No:",
			value: customer.vehicle_number,
		},
		{
			label: "Mob. No:",
			value: customer.mobile_number,
		},
		{
			label: "Date:",
			value: record.date,
		},
		{
			label: "Time:",
			value: record.time,
		},
		{
			label: "FP. ID:",
			value: record.pump_number,
		},
		{
			label: "Nozl No:",
			value: record.nozzle_number,
		},
		{
			label: "Fuel:",
			value: customer.vehicle_type,
		},
		{
			label: "Preset:",
			value: "NON PRESET",
		},
		{
			className: "font-bold",
			label: "Rate:",
			value: record.rate,
		},
		{
			className: "font-bold",
			label: "Sale:",
			value: record.amount,
		},
		{
			className: "font-bold",
			label: "Volume:",
			value: record.volume,
		},
	];

	return (
		<div>
			{/* Station Logo */}
			<img
				alt="Fuel Station Logo"
				class="mx-auto w-[100px] h-[100px] object-contain mb-1 mix-blend-multiply contrast-200"
				src={record.station_logo}
			/>

			{/* Station Address */}
			<div class="text-center font-bold uppercase">
				{record.station_address}
			</div>
			<div class="text-center">{record.station_address}</div>

			{/* Receipt Items */}
			{receiptItems.map(({ label, value, className }) => (
				<div class={className} key={label}>
					<span>{label}</span>
					<span>{value}</span>
				</div>
			))}

			{/* Footer */}
			<div class="text-center mb-2">
				<p>THANK YOU</p>
				<p>VISIT AGAIN</p>
			</div>
		</div>
	);
};

export default IOCReceipt;
