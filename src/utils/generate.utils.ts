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
			preferCSSPageSize: true,
			printBackground: true,
		});

		return new Uint8Array(pdf);
	} finally {
		await page.close();
	}
}
