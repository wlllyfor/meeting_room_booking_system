import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateParamsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requiredParams = ['address']; // 定义需要校验的参数列表

    for (const param of requiredParams) {
      if (!req.query[param]) {
        return res.status(400).json({
          code: 400,
          message: 'fail',
          data: `缺少必要的参数 ${param}`,
        });
      }
    }

    next(); // 执行下一个中间件或控制器
  }
}
