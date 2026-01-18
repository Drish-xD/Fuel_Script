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
`;

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>Fuel Receipt</title>
				<script src="https://cdn.tailwindcss.com"></script>
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link
					crossorigin="anonymous"
					href="https://fonts.gstatic.com"
					rel="preconnect"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
					rel="stylesheet"
				/>

				<Style>{STYLES}</Style>
			</head>
			<body class="bg-white w-full p-0 m-0 font-press text-[8px] font-light leading-tight text-gray-700 opacity-90">
				{children}
			</body>
		</html>
	);
};

export const ReceiptContainer: FC<PropsWithChildren> = ({ children }) => (
	<section class="w-full min-h-screen flex items-center justify-center break-after-page">
		<div class="relative w-[250px] rounded shadow-lg grayscale brightness-90 contrast-140">
			{children}
			<div class="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 bg-[url('https://transparenttextures.com/patterns/green-dust-and-scratches.png')]" />
		</div>
	</section>
);
