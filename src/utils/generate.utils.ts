import { type Browser, chromium } from "playwright";

let browser: Browser | null = null;

const isDebug = Bun.env.DEBUG_IN_BROWSWE === "true";

async function getBrowser(): Promise<Browser> {
	if (!browser) {
		browser = await chromium.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: !isDebug,
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
			format: "A4",
			preferCSSPageSize: true,
			printBackground: true,
		});

		return new Uint8Array(pdf);
	} finally {
		if (!isDebug) {
			await page.close();
		}
	}
}
