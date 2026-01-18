import { z } from "zod";
import { CustomerInfoSchema, FuelStationSchema } from "./input";

export const CSVRowSchema = z.object({
	Date: z.iso.date().nonempty(),
	Time: z.iso.time().nonempty(),
	Rate: z.coerce.number().min(1).default(0),
	Amount: z.coerce.number().min(1).default(0),
});

const TransactionSchema = z.object({
	number: z.string().nonempty(),
	date: z.string().nonempty(),
	time: z.string().nonempty(),
	rate: z.string().nonempty(),
	amount: z.string().nonempty(),
	volume: z.string().nonempty(),
});

const ReceiptFuelStationSchema = FuelStationSchema.extend({
	receiptNumber: z.string().nonempty(),
	nozzleNumber: z.string().nonempty(),
	pumpNumber: z.string().nonempty(),
});

export type ReceiptFuelStation = z.infer<typeof ReceiptFuelStationSchema>;

export const ReceiptTemplateSchema = z.object({
	fuelStation: ReceiptFuelStationSchema,
	customer: CustomerInfoSchema,
	transaction: TransactionSchema,
});

export type ReceiptTemplate = z.infer<typeof ReceiptTemplateSchema>;
export type CSVRow = z.infer<typeof CSVRowSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
