import { Request } from 'express';

export interface UserAuthType {
  _id: string 
}

declare module 'express-serve-static-core' {
interface Request {
  user?: string; 
}
}