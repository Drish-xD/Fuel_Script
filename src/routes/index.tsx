import { renderToString } from "hono/jsx/dom/server";
import { PDF_HEADERS } from "@/constants";
import ReceiptList from "@/template/index";
import { createApp } from "@/utils/app.utils";
import { generatePDF } from "@/utils/generate.utils";
import { parseConfig, parseCSV } from "@/utils/parsers";
import { generateTemplateData } from "@/utils/template";

const app = createApp();

app.get("/", (c) => c.json({ message: "Hello World" }));

app.get("/v1/generate", async (c) => {
	const config = await parseConfig("./input/config.json");
	const csvData = await parseCSV("./input/input.csv");
	const templateData = generateTemplateData(config, csvData);

	const html = await renderToString(<ReceiptList receipts={templateData} />);

	const pdfBuffer = await generatePDF(html);

	return c.body(pdfBuffer, 200, PDF_HEADERS);
});

export default app;
