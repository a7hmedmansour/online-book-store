export function logger(req, res, next) {
	console.log(`Request received - ${new Date().toISOString()}`);
	console.log(`Requesr method:`, req.method);
	console.log(`Request path:`, req.path);
	next();
}
