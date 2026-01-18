import { format } from "date-fns";
import { STATION_CONFIG } from "@/constants";
import {
	type TBody,
	type TCSVRecord,
	type TReceipt,
	TransactionSchema,
	type TTransaction,
} from "@/validators";
import { parseCSV } from "./parser.utils";

const getLocalAssetUrl = (path: string) => {
	return `${Bun.env.BASE_URL ?? "http://localhost:3000"}/static/${path}`;
};

const generateRandomNumber = (
	length: number,
	options?: { prefix?: string; min?: number; max?: number },
): string => {
	const min = options?.min ?? 10 ** (length - 1);
	const max = options?.max ?? 10 ** length - 1;
	const number = Math.floor(Math.random() * (max - min + 1)) + min;

	return options?.prefix ? `${options.prefix}${number}` : number.toString();
};

const formatCurrency = (amount: number): string => {
	// return new Intl.NumberFormat("en-IN", {
	//   style: "currency",
	//   currency: "INR",
	//   minimumFractionDigits: 2,
	//   maximumFractionDigits: 2,
	//   currencyDisplay: "code",
	// }).format(amount);

	return amount.toFixed(2);
};

const getTransactionData = (csvRow: TCSVRecord): TTransaction => {
	const stationConfig = STATION_CONFIG[csvRow.Station_Type];

	return TransactionSchema.parse({
		amount: formatCurrency(csvRow.Amount),
		atot: generateRandomNumber(6, { prefix: "0000" }),
		date_time: new Date(`${csvRow.Date} ${csvRow.Time}`),
		density: csvRow.Density.toString(),
		gstin: csvRow.GSTIN,
		id: generateRandomNumber(stationConfig.id.length, {
			prefix: stationConfig.id.prefix,
		}),
		nozzle_number: generateRandomNumber(1, { max: 6, min: 1 }),
		pump_number: generateRandomNumber(1, { max: 6, min: 1 }),
		rate: formatCurrency(csvRow.Rate),
		receipt_number: generateRandomNumber(6),
		side_logo: getLocalAssetUrl("hdfc_logo.png"),
		station_address: csvRow.Station_Address,
		station_logo: stationConfig.logo,
		station_name: csvRow.Station_Name,
		station_type: csvRow.Station_Type,
		volume: (csvRow.Amount / csvRow.Rate).toFixed(1),
		vtot: generateRandomNumber(6, { prefix: "0000" }),
	});
};

export const generateReceiptData = async ({
	file,
	...customer
}: TBody): Promise<TReceipt[]> => {
	const csvData = await parseCSV(file);
	return csvData.map((record) => ({
		customer,
		record: getTransactionData(record),
		texture: getLocalAssetUrl(
			`textures/${Math.floor(Math.random() * 12) + 1}.jpg`,
		),
	}));
};
