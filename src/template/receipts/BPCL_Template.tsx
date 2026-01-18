import { addMinutes, format, subMonths } from "date-fns";
import type { FC } from "hono/jsx";
import type { TReceipt } from "@/validators";
import SideStrip from "../Layout/SideStrip";

const BPCLReceipt: FC<TReceipt> = ({ customer, record, texture }) => {
	const receiptItems: {
		label: string;
		value: string;
		className?: string;
		hidden?: boolean;
	}[] = [
		{
			label: "Date:",
			value: format(record.date_time, "dd-MM-yyyy"),
		},
		{
			label: "Time:",
			value: format(record.date_time, "hh:mm:ss"),
		},
		{
			label: "Bay No:",
			value: record.pump_number,
		},
		{
			label: "Nozzle No:",
			value: record.nozzle_number,
		},
		{
			label: "Product:",
			value: customer.vehicle_type,
		},
		{
			label: "Payment Mode:",
			value: "Cash",
		},
		{
			label: "Txn Id:",
			value: record.id,
		},
		{
			label: "Attendant:",
			value: "",
		},
		{
			label: "TxSt:",
			value: format(record.date_time, "dd-MM-yyyy hh:mm:ss"),
		},
		{
			label: "TxEnd:",
			value: format(addMinutes(record.date_time, 2.5), "dd-MM-yyyy hh:mm:ss"),
		},
		{
			label: "Rate/Ltr.:",
			value: record.rate,
		},
		{
			label: "Volume(Ltr.):",
			value: record.volume,
		},
		{
			label: "Amount(Rs.) :",
			value: record.amount,
		},
		{
			label: "PresetType:",
			value: "NON PRESET",
		},
		{
			label: "Vehicle No:",
			value: customer.vehicle_number,
		},
		{
			label: "Mobile No:",
			value: customer.mobile_number,
		},
	];

	return (
		<div
			class={`font-vt323 text-[18px] font-normal leading-4 p-4 bg-cover bg-center bg-no-repeat bg-[url('${texture}')]`}
		>
			{/* Station Logo */}
			<img
				alt="Fuel Station Logo"
				class="mx-auto w-[80px] h-[80px] object-contain mb-2 mix-blend-multiply"
				src={record.station_logo}
			/>

			{/* Station Welcome Message */}
			<p class="text-center mb-1">Welcomes To BPCL</p>

			{/* Station Address */}
			<div class="text-center uppercase">
				<p>{record.station_name}</p>
				<p>Tin. No.:- {record.gstin}</p>
				<p>{record.station_address}</p>
			</div>

			{/* Receipt Items */}
			{receiptItems.map(({ label, value, className, hidden }) => {
				if (hidden) return null;

				return (
					<div
						class={`my-1 flex flex-row gap-1 items-center justify-between ${className}`}
						key={label}
					>
						<span class="whitespace-nowrap">{label}</span>
						<span>{value}</span>
					</div>
				);
			})}

			{/* Footer */}
			<p class="text-center uppercase my-4">Thank You For Fueling</p>

			<p class="text-center uppercase my-4">Mission LiFE</p>

			{/* Strip */}
			<SideStrip
				side_logo={record.side_logo}
				side_logo_text={`D ${format(subMonths(record.date_time, 3), "MM/yyyy")}`}
			/>
		</div>
	);
};

export default BPCLReceipt;
