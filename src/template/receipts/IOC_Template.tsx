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
			label: "Inv. No.:",
			value: record.id,
		},
		{
			label: "PCC ID:",
			value: record.receipt_number,
		},
		{
			label: "FIP No.    :",
			value: record.pump_number,
		},
		{
			label: "Nozzle No.    :",
			value: record.nozzle_number,
		},
		{
			label: "Product:",
			value: customer.vehicle_type,
		},
		{
			label: "Density:",
			value: `${record.density}kg/Cu.mtr`,
		},
		{
			label: "Preset Type:",
			value: "Volume",
		},
		{
			label: "Rate (Rs/L) :",
			value: record.rate,
		},
		{
			label: "Volume (L) :",
			value: record.volume,
		},
		{
			label: "Amount (Rs) :",
			value: record.amount,
		},
		{
			label: "Atot :",
			value: record.atot,
		},
		{
			className: "mb-4",
			label: "Vtot :",
			value: record.vtot,
		},
		{
			label: "Vehicle No:",
			value: customer.vehicle_number,
		},
		{
			className: "mb-4",
			label: "Mobile No:",
			value: customer.mobile_number,
		},
		{
			label: "Date:",
			value: record.date,
		},
		{
			className: "mb-4",
			label: "Time:",
			value: record.time,
		},
		{
			label: "CST No.   :",
			value: record.gstin,
		},
		{
			label: "LST No.   :",
			value: "",
		},
		{
			label: "VAT No.   :",
			value: "",
		},
	];

	return (
		<div
			class={`font-vt323 text-[18px] font-normal leading-4 p-4 bg-cover bg-center bg-no-repeat bg-[url('${texture}')]`}
		>
			<div class="flex flex-row gap-2 mb-1">
				<span class="min-w-[25%] whitespace-nowrap">Inv. No.:</span>
				<span>{record.id}</span>
			</div>

			{/* Station Logo */}
			<img
				alt="Fuel Station Logo"
				class="mx-auto w-[100px] h-[100px] object-contain mb-2 mix-blend-multiply"
				src={record.station_logo}
			/>

			{/* Station Welcome Message */}
			<p class="font-roboto text-center text-[18px] mb-1">Welcomes You</p>
			<p class="text-center">Duplicate Receipt Copy</p>

			{/* Station Address */}
			<div class="text-center uppercase mb-4">{record.station_address}</div>

			{/* Receipt Items */}
			{receiptItems.map(({ label, value, className, hidden }) => {
				if (hidden) return null;

				return (
					<div class={`my-1 flex flex-row gap-1 ${className}`} key={label}>
						<span class="min-w-[25%] whitespace-nowrap">{label}</span>
						<span>{value}</span>
					</div>
				);
			})}

			{/* Footer */}
			<p class="text-center my-4">Thank You! Please Visit Again.</p>

			<p class="pb-10">
				Printed On: <br />
				{record.date} {record.time}
			</p>
		</div>
	);
};

export default IOCReceipt;
