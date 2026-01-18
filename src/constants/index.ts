export const STATION_TYPES = {
	HP: "HP",
	IOC: "IOC",
	BPCL: "BPCL",
} as const;

export type TStationType = (typeof STATION_TYPES)[keyof typeof STATION_TYPES];

export const STATION_LOGOS = {
	HP: "https://freeforonline.com/assets/images/bill/pump-logo-hp.webp",
	IOC: "https://freeforonline.com/assets/images/bill/pump-logo-indian-oil.webp",
	BPCL: "https://freeforonline.com/assets/images/bill/pump-logo-bharat-petroleum.webp",
} as const;

export type TStationLogo = (typeof STATION_LOGOS)[keyof typeof STATION_LOGOS];

export const PDF_HEADERS = {
	"Content-Type": "application/pdf",
	"Content-Disposition": 'inline; filename="receipts.pdf"',
};
