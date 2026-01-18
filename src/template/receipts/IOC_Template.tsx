import type { FC } from "hono/jsx";
import type { TReceipt } from "@/validators";

const IOCReceipt: FC<TReceipt> = ({ customer, record, texture }) => {
	const receiptItems: {
		label: string;
		value: string;
		className?: string;
		hidden?: boolean;
	}[] = [
		{
			hidden: !record.gstin.length,
			label: "GSTIN",
			value: record.gstin,
		},
		{
			label: "Bill No",
			value: `${record.receipt_number}-ORGNL`,
		},
		{
			label: "Trans. ID",
			value: record.id,
		},
		{
			label: "Attnd. ID",
			value: "",
		},
		{
			className: "mb-3",
			label: "Receipt",
			value: "Physical Receipt",
		},
		{
			label: "Name",
			value: customer.customer_name,
		},
		{
			label: "Vehi. No",
			value: customer.vehicle_number,
		},
		{
			className: "mb-3",
			label: "Mob. No",
			value: customer.mobile_number,
		},
		{
			label: "Date",
			value: record.date,
		},
		{
			label: "Time",
			value: record.time,
		},
		{
			label: "FP. ID",
			value: record.pump_number,
		},
		{
			label: "Nozl. No.",
			value: record.nozzle_number,
		},
		{
			label: "Fuel",
			value: customer.vehicle_type,
		},
		{
			label: "Density",
			value: `${record.density}kg/m3`,
		},
		{
			className: "mb-3",
			label: "Preset",
			value: "NON PRESET",
		},
		{
			label: "Rate",
			value: `Rs.${record.rate}`,
		},
		{
			label: "Sale",
			value: `Rs.${record.amount}`,
		},
		{
			label: "Volume",
			value: `${record.volume}L`,
		},
	];

	return (
		<div class={`p-4 bg-cover bg-center bg-no-repeat bg-[url('${texture}')]`}>
			{/* Station Logo */}
			<img
				alt="Fuel Station Logo"
				class="mx-auto w-[100px] h-[100px] object-contain mb-2 mix-blend-multiply contrast-200"
				src={record.station_logo}
			/>

			{/* Station Address */}
			<div class="text-center uppercase mb-4">{record.station_address}</div>

			{/* Receipt Items */}
			{receiptItems.map(({ label, value, className, hidden }) => {
				if (hidden) return null;

				return (
					<div class={`my-1 flex flex-row gap-1 ${className}`} key={label}>
						<span class="w-1/4 whitespace-nowrap ">{label}</span>
						<span>: {value}</span>
					</div>
				);
			})}

			{/* Footer */}
			<div class="text-center mt-4">
				<p>THANK YOU</p>
				<p>VISIT AGAIN</p>
			</div>
		</div>
	);
};

export default IOCReceipt;
