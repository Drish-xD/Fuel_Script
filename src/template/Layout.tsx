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
			<body class="bg-white w-full h-full p-0 m-0 font-press text-[11px] leading-tight text-black flex flex-col items-center justify-center">
				{children}
			</body>
		</html>
	);
};

export const ReceiptContainer: FC<PropsWithChildren> = ({ children }) => (
	<div
		class="w-[300px] h-fit p-2 break-after-page"
		style={{
			backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
			backgroundSize: "cover",
			boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
			filter: "grayscale(0.1) brightness(0.95) contrast(1.05)",
			transform: "rotate(-0.2deg)",
		}}
	>
		{children}
		<div
			class="absolute inset-0 pointer-events-none"
			style={{
				backgroundImage:
					"url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
				opacity: 0.05,
				zIndex: 10,
			}}
		/>
	</div>
);
