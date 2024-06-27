import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataloaderService } from '../dataloader/dataloader.service';

@Injectable()
export class DataloaderMiddleware implements NestMiddleware {
  constructor(private readonly dataloaderService: DataloaderService) {}

  use(req: Request, res: Response, next: NextFunction) {
    req['loaders'] = this.dataloaderService.getLoaders();
    next();
  }
}
