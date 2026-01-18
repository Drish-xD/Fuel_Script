import { z } from "zod";
import { STATION_TYPES } from "@/constants";

/**
 * Customer information schema
 */
export const CustomerInfoSchema = z.object({
	customer_name: z.string().min(1),
	mobile_number: z.string().min(1).max(10),
	vehicle_number: z.string().min(1),
	vehicle_type: z.string().min(1),
});

export type TCustomerInfo = z.infer<typeof CustomerInfoSchema>;

/**
 * Input configuration schema
 */
export const BodySchema = CustomerInfoSchema.extend({
	file: z.file().nonoptional(),
});

export type TBody = z.infer<typeof BodySchema>;

/**
 * CSV row schema
 */
export const CSVRecordSchema = z.object({
	Amount: z.coerce.number().min(1).default(0),
	Date: z.iso.date().nonempty(),
	Density: z.coerce.number().min(1).default(0),
	GSTIN: z.string().optional().default(""),
	Rate: z.coerce.number().min(1).default(0),
	Station_Address: z.string().min(1),
	Station_Type: z.enum(STATION_TYPES),
	Time: z.iso.time().nonempty(),
});

export type TCSVRecord = z.infer<typeof CSVRecordSchema>;

export const TransactionSchema = z.object({
	amount: z.string().nonempty(),
	date: z.string().nonempty(),
	density: z.string().nonempty(),
	gstin: z.string().optional().default(""),
	id: z.string().nonempty(),
	nozzle_number: z.string().nonempty(),
	pump_number: z.string().nonempty(),
	rate: z.string().nonempty(),
	receipt_number: z.string().nonempty(),
	side_logo: z.string().nonempty(),
	side_logo_text: z.string().nonempty(),
	station_address: z.string().nonempty(),
	station_logo: z.string().nonempty(),
	station_type: z.enum(STATION_TYPES),
	time: z.string().nonempty(),
	volume: z.string().nonempty(),
});

export type TTransaction = z.infer<typeof TransactionSchema>;

/**
 * Receipt schema
 */
export const ReceiptSchema = z.object({
	customer: CustomerInfoSchema,
	record: TransactionSchema,
	texture: z.string().nonempty(),
});

export type TReceipt = z.infer<typeof ReceiptSchema>;
