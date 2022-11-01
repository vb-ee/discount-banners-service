import { IJwtPayload } from '../middleware'

declare global {
    namespace Express {
        interface Request {
            payload: IJwtPayload
        }
    }
}
