import { z } from "zod";

/**
 * Customer information schema
 */
export const CustomerInfoSchema = z.object({
	name: z.string().min(1),
	mobile_number: z.string().min(1).max(10),
	vehicle_number: z.string().min(1),
	vehicle_type: z.string().min(1),
});

export type TCustomerInfo = z.infer<typeof CustomerInfoSchema>;

/**
 * Fuel station schema
 */
export const FuelStationSchema = z.object({
	name: z.string().min(1),
	address: z.string().min(1),
	logoSrc: z.string().min(1),
});

export type TFuelStation = z.infer<typeof FuelStationSchema>;

/**
 * Input configuration schema
 */
export const InputConfigSchema = z.object({
	customer: CustomerInfoSchema,
	fuel_stations: z.array(FuelStationSchema),
});

export type TInputConfig = z.infer<typeof InputConfigSchema>;
