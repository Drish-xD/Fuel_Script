import { parse } from "csv-parse/sync";
import { CSVRecordSchema, type TCSVRecord } from "@/validators";

/**
 * Parse CSV file referenced by config
 */
export async function parseCSV(file: File): Promise<TCSVRecord[]> {
	try {
		console.log(`[CSV Parser] Parsing CSV file: ${file.name} (${file.size} bytes)`);
		const text = await file.text();
		const records = parse<TCSVRecord>(text, {
			columns: true,
			skip_empty_lines: true,
			trim: true,
		});

		console.log(`[CSV Parser] Parsed ${records.length} row(s) from CSV`);

		const validatedRecords = records.map((record: unknown, index: number) => {
			try {
				return CSVRecordSchema.parse(record);
			} catch (err) {
				const errorMessage = `CSV validation failed at row ${index + 2}: ${(err as Error).message}`;
				console.error(`[CSV Parser] ${errorMessage}`);
				throw new Error(errorMessage);
			}
		});

		console.log(`[CSV Parser] Successfully validated ${validatedRecords.length} record(s)`);
		return validatedRecords;
	} catch (error) {
		console.error(`[CSV Parser] Error parsing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
		throw error;
	}
}
