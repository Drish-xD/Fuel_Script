import { parse } from "csv-parse/sync";
import { CSVRecordSchema, type TCSVRecord } from "@/validators";

/**
 * Parse CSV file referenced by config
 */
export async function parseCSV(file: File): Promise<TCSVRecord[]> {
	const text = await file.text();
	const records = parse<TCSVRecord>(text, {
		columns: true,
		skip_empty_lines: true,
		trim: true,
	});

	return records.map((record: unknown, index: number) => {
		try {
			return CSVRecordSchema.parse(record);
		} catch (err) {
			throw new Error(
				`CSV validation failed at row ${index + 2}: ${(err as Error).message}`,
			);
		}
	});
}
