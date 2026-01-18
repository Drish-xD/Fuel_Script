import { renderToString } from "hono/jsx/dom/server";
import { PDF_HEADERS } from "@/constants";
import ReceiptList from "@/template/index";
import { createApp } from "@/utils/app.utils";
import { generatePDF } from "@/utils/generate.utils";
import { generateReceiptData } from "@/utils/template.utils";
import type { TBody } from "@/validators";

const app = createApp();

app.get("/", (c) => c.json({ message: "Hello World" }));

app.post("/v1/generate", async (c) => {
	try {
		const body = await c.req.parseBody<TBody>();
		
		console.log(`[PDF Generation] Starting receipt generation for ${body.file.name || 'CSV file'}`);
		
		const templateData = await generateReceiptData(body);
		console.log(`[PDF Generation] Generated ${templateData.length} receipt(s)`);

		const html = await renderToString(<ReceiptList receipts={templateData} />);
		console.log(`[PDF Generation] HTML template rendered successfully`);

		const pdfBuffer = await generatePDF(html);
		console.log(`[PDF Generation] PDF generated successfully (${pdfBuffer.length} bytes)`);

		return c.body(pdfBuffer, 200, PDF_HEADERS);
	} catch (error) {
		console.error(`[PDF Generation] Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
		throw error;
	}
});

export default app;
