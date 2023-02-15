import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { prisma } from "../../index.js";
dotenv.config();
const JWTStrategypublisher = new Strategy(
	{
		secretOrKey: process.env.ACCESS_TOKEN_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	},
	async (payload, done) => {
		try {
			const publisher = await prisma.publisher.findUnique({
				where: {
					id: payload.userId,
				},
			});
			if (publisher.status == "Accept") {
				return done(null, publisher);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	},
);

export default JWTStrategypublisher;
