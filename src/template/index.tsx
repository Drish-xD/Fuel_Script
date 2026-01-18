import { type FC, Fragment } from "hono/jsx";
import type { ReceiptTemplate } from "../validators/template";
import HPReceipt from "./HP_Template";
import IOCReceipt from "./IOC_Template";
import Layout from "./Layout";

const TEMPLATES = [HPReceipt, IOCReceipt] as const;

const ReceiptList: FC<{ receipts: ReceiptTemplate[] }> = ({ receipts }) => {
	const ReceiptComponent = TEMPLATES[receipts[0].fuelStation.type];

	return (
		<Fragment>
			{receipts.map((receipt) => (
				<Layout key={receipt.transaction.number}>
					<ReceiptComponent {...receipt} />
				</Layout>
			))}
		</Fragment>
	);
};

export default ReceiptList;
