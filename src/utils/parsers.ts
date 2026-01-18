import { parse } from "csv-parse/sync";
import { InputConfigSchema, type TInputConfig } from "@/validators/input";
import { type CSVRow, CSVRowSchema } from "@/validators/template";

/**
 * Load and validate config.json
 */
export async function parseConfig(configPath: string): Promise<TInputConfig> {
	const config = await Bun.file(configPath).json();
	return InputConfigSchema.parse(config);
}

/**
 * Parse CSV file referenced by config
 */
export async function parseCSV(csvPath: string): Promise<CSVRow[]> {
	const csv = await Bun.file(csvPath).text();

	const records = parse<CSVRow>(csv, {
		columns: true,
		skip_empty_lines: true,
		trim: true,
	});

	return records.map((record: unknown, index: number) => {
		try {
			return CSVRowSchema.parse(record);
		} catch (err) {
			throw new Error(
				`CSV validation failed at row ${index + 2}: ${(err as Error).message}`,
			);
		}
	});
}
