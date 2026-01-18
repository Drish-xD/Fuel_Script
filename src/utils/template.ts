import { format } from "date-fns";
import type { TFuelStation, TInputConfig } from "@/validators/input";
import type {
	CSVRow,
	ReceiptFuelStation,
	ReceiptTemplate,
	Transaction,
} from "@/validators/template";

const generateRandomNumber = (length: number, prefix?: string): string => {
	const min = 10 ** (length - 1);
	const max = 10 ** length - 1;
	const number = Math.floor(Math.random() * (max - min + 1)) + min;
	return prefix ? `${prefix}${number}` : number.toString();
};

const getRandomFuelStation = (
	fuelStations: TFuelStation[],
): ReceiptFuelStation => {
	const randomIndex = Math.floor(Math.random() * fuelStations.length);
	const fuelStation = fuelStations[randomIndex];

	if (!fuelStation) {
		throw new Error("Invalid fuel station");
	}

	return {
		...fuelStation,
		logoSrc: fuelStation.logoSrc,
		nozzleNumber: (Math.floor(Math.random() * 5) + 1).toString(),
		pumpNumber: (Math.floor(Math.random() * 3) + 1).toString(),
		receiptNumber: generateRandomNumber(6),
	};
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

const getTransactionData = (csvRow: CSVRow): Transaction => {
	return {
		number: generateRandomNumber(10, "000000"),
		date: format(new Date(csvRow.Date), "dd/MM/yyyy"),
		time: format(new Date(`${csvRow.Date} ${csvRow.Time}`), "hh:mm:ss"),
		rate: formatCurrency(csvRow.Rate),
		amount: formatCurrency(csvRow.Amount),
		volume: (csvRow.Amount / csvRow.Rate).toFixed(1),
	};
};

export function generateTemplateData(
	config: TInputConfig,
	csvData: CSVRow[],
): ReceiptTemplate[] {
	return csvData.map((csvRow) => {
		return {
			fuelStation: getRandomFuelStation(config.fuel_stations),
			customer: config.customer,
			transaction: getTransactionData(csvRow),
		};
	});
}
