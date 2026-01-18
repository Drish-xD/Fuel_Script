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
	const body = await c.req.parseBody<TBody>();
	const templateData = await generateReceiptData(body);

	console.log("templateData : :: : : ", templateData);

	const html = await renderToString(<ReceiptList receipts={templateData} />);

	const pdfBuffer = await generatePDF(html);

	return c.body(pdfBuffer, 200, PDF_HEADERS);
});

export default app;
