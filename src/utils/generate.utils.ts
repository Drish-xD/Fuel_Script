import { type Browser, chromium } from "playwright";

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
	if (!browser) {
		browser = await chromium.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
	}
	return browser;
}

/**
 * Generates a PDF buffer from an HTML string
 */
export async function generatePDF(html: string) {
	const browser = await getBrowser();
	const page = await browser.newPage();

	try {
		await page.setContent(html, {
			waitUntil: "networkidle",
		});

		const pdf = await page.pdf({
			printBackground: true,
			preferCSSPageSize: true,
			width: "320px",
			height: "480px",
		});

		return new Uint8Array(pdf);
	} finally {
		await page.close();
	}
}

const generate = async (config: TInputConfig, csvData: CSVRow[]) => {};
