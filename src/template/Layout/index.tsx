import { css, Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

const STYLES = css`
@media print {
	@page {
		size: 300px auto; /* width fixed, height grows */
		margin: 0;
	}

	body {
		margin: 0;
	}
}

.font-press {
	font-family: 'Press Start 2P', monospace;
}
.font-roboto {
	font-family: 'Roboto Flex', monospace;
}
.font-vt323 {
	font-family: 'VT323', monospace;
}
`;

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>Fuel Receipt</title>
				<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link
					crossorigin="anonymous"
					href="https://fonts.gstatic.com"
					rel="preconnect"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Flex:opsz,wght,XOPQ,XTRA,YOPQ,YTDE,YTFI,YTLC,YTUC@8..144,100..1000,96,468,79,-203,738,514,712&family=VT323&display=swap"
					rel="stylesheet"
				/>
				<Style>{STYLES}</Style>
			</head>
			<body class="bg-white w-full p-0 m-0 leading-tight text-gray-700">
				{children}
			</body>
		</html>
	);
};

export const ReceiptContainer: FC<PropsWithChildren> = ({ children }) => (
	<section class="w-full min-h-screen flex items-center justify-center break-after-page">
		<div class="relative w-[250px] rounded shadow-lg grayscale brightness-90 contrast-110 opacity-90 blur-[0.2px]">
			{children}
			<div class="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 bg-[url('https://transparenttextures.com/patterns/green-dust-and-scratches.png')]" />
		</div>
	</section>
);
