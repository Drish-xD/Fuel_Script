import { format } from "date-fns";
import { STATION_LOGOS } from "@/constants";
import {
	type TBody,
	type TCSVRecord,
	type TReceipt,
	TransactionSchema,
	type TTransaction,
} from "@/validators";
import { parseCSV } from "./parser.utils";

const generateRandomNumber = (length: number, prefix?: string): string => {
	const min = 10 ** (length - 1);
	const max = 10 ** length - 1;
	const number = Math.floor(Math.random() * (max - min + 1)) + min;
	return prefix ? `${prefix}${number}` : number.toString();
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
	return TransactionSchema.parse({
		amount: formatCurrency(csvRow.Amount),
		date: format(new Date(csvRow.Date), "dd/MM/yyyy"),
		density: csvRow.Density.toString(),
		gstin: csvRow.GSTIN,
		id: generateRandomNumber(10, "000000"),
		nozzle_number: generateRandomNumber(1, "0"),
		pump_number: generateRandomNumber(1, "0"),
		rate: formatCurrency(csvRow.Rate),
		receipt_number: generateRandomNumber(6),
		station_address: csvRow.Station_Address,
		station_logo: STATION_LOGOS[csvRow.Station_Type],
		station_type: csvRow.Station_Type,
		time: format(new Date(`${csvRow.Date} ${csvRow.Time}`), "hh:mm:ss"),
		volume: (csvRow.Amount / csvRow.Rate).toFixed(1),
	});
};

export const generateReceiptData = async ({
	file,
	...customer
}: TBody): Promise<TReceipt[]> => {
	const csvData = await parseCSV(file);
	console.log("csvData : :: : : ", csvData);

	return csvData.map((record) => ({
		customer,
		record: getTransactionData(record),
	}));
};
