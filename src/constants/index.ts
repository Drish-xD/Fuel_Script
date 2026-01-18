export const STATION_TYPES = {
	BPCL: "BPCL",
	HP: "HP",
	IOC: "IOC",
} as const;

export type TStationType = (typeof STATION_TYPES)[keyof typeof STATION_TYPES];

export const STATION_CONFIG = {
	BPCL: {
		id: {
			length: 10,
			prefix: undefined,
		},
		logo: "https://freeforonline.com/assets/images/bill/pump-logo-bharat-petroleum.webp",
	},
	HP: {
		id: {
			length: 10,
			prefix: undefined,
		},
		logo: "https://freeforonline.com/assets/images/bill/pump-logo-hp.webp",
	},
	IOC: {
		id: {
			length: 16,
			prefix: undefined,
		},
		logo: "https://freeforonline.com/assets/images/bill/pump-logo-indian-oil.webp",
	},
} as const;

export const PDF_HEADERS = {
	"Content-Disposition": 'inline; filename="receipts.pdf"',
	"Content-Type": "application/pdf",
};
