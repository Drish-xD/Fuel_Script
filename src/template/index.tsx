import type { FC } from "hono/jsx";
import type { TStationType } from "@/constants";
import type { TReceipt } from "@/validators";
import { Layout, ReceiptContainer } from "./Layout";
import BPCLReceipt from "./receipts/BPCL_Template";
import HpReceipt from "./receipts/HP_Template";
import IOCReceipt from "./receipts/IOC_Template";

const TEMPLATES: Record<TStationType, FC<TReceipt>> = {
	BPCL: BPCLReceipt,
	HP: HpReceipt,
	IOC: IOCReceipt,
};

const ReceiptList: FC<{ receipts: TReceipt[] }> = ({ receipts }) => (
	<Layout>
		{receipts.map(({ customer, record }) => {
			const ReceiptComponent = TEMPLATES[record.station_type];

			return (
				<ReceiptContainer key={record.id}>
					<ReceiptComponent customer={customer} record={record} />
				</ReceiptContainer>
			);
		})}
	</Layout>
);

export default ReceiptList;
