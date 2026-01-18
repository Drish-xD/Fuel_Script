import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { trimTrailingSlash } from "hono/trailing-slash";
import packageJSON from "../../package.json";

export const createApp = () => new OpenAPIHono();

export const initOpenAPI = (app: OpenAPIHono) => {
	app.doc("/docs/openapi", {
		info: {
			contact: packageJSON.author,
			description: packageJSON.description,
			license: {
				name: packageJSON.license,
				url: "https://opensource.org/license/gpl-3-0",
			},
			title: packageJSON.description,
			version: packageJSON.version,
		},
		openapi: "3.1.0",
	});

	// initialize the API reference
	app.get(
		"/docs",
		Scalar({
			layout: "classic",
			theme: "saturn",
			url: "/docs/openapi",
		}),
	);
};

export const middleware = (app: OpenAPIHono) => {
	app.use(trimTrailingSlash());
	app.use(requestId());
	app.use(cors());
	app.use(logger());
	app.use(prettyJSON());
	// Serve static files from texture directory
	app.use(
		"/static/*",
		serveStatic({
			onFound: (path, c) => {
				console.log(`Static file found: ${path}`);
				c.header("Cache-Control", "public, max-age=31536000");
			},
			onNotFound: (path, c) => {
				console.log(
					`Static file not found: ${path} (requested: ${c.req.path})`,
				);
			},
			rewriteRequestPath: (path) =>
				path.replace(/^\/static/, "/src/template/assets"),
			root: "./",
		}),
	);
};
