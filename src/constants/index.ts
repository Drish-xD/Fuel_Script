export const STATION_TYPES = {
	BPCL: "BPCL",
	HP: "HP",
	IOC: "IOC",
} as const;

export type TStationType = (typeof STATION_TYPES)[keyof typeof STATION_TYPES];

export const STATION_LOGOS = {
	BPCL: "https://freeforonline.com/assets/images/bill/pump-logo-bharat-petroleum.webp",
	HP: "https://freeforonline.com/assets/images/bill/pump-logo-hp.webp",
	IOC: "https://freeforonline.com/assets/images/bill/pump-logo-indian-oil.webp",
} as const;

export type TStationLogo = (typeof STATION_LOGOS)[keyof typeof STATION_LOGOS];

export const PDF_HEADERS = {
	"Content-Disposition": 'inline; filename="receipts.pdf"',
	"Content-Type": "application/pdf",
};
