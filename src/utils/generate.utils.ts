import { type Browser, chromium } from "playwright";

let browser: Browser | null = null;

const isDebug = Bun.env.DEBUG_IN_BROWSWE === "true";

async function getBrowser(): Promise<Browser> {
	if (!browser) {
		console.log(`[Browser] Initializing browser (headless: ${!isDebug})`);
		browser = await chromium.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: !isDebug,
		});
		console.log(`[Browser] Browser initialized successfully`);
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
		console.log(`[PDF] Setting page content (HTML length: ${html.length} chars)`);
		await page.setContent(html, {
			waitUntil: "networkidle",
		});

		console.log(`[PDF] Generating PDF...`);
		const pdf = await page.pdf({
			format: "A4",
			preferCSSPageSize: true,
			printBackground: true,
		});

		console.log(`[PDF] PDF generated successfully`);
		return new Uint8Array(pdf);
	} catch (error) {
		console.error(`[PDF] Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
		throw error;
	} finally {
		if (!isDebug) {
			await page.close();
		}
	}
}
