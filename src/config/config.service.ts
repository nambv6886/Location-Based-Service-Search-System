import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as Joi from 'joi';

import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const filePath = `.env`;
    // const isCompiled = path.extname(__filename) === '.js';
    const envFile = path.resolve(
      __dirname,
      // isCompiled ? '../../../' : '../../',
      '../../',
      filePath,
    );
    const config = dotenv.parse(fs.readFileSync(envFile));
    this.envConfig = this.validate(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  validate(env: EnvConfig): EnvConfig {
    const joiSchema: Joi.ObjectSchema = Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      DB_TYPE: Joi.string().required(),
      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().required(),
      JWT_SECRET_KEY: Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRES_TIME: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRES_TIME: Joi.string().required(),
    });

    const { error, value } = joiSchema.validate(env);
    if (error) {
      throw new Error(`Config validation invalid: ${error.message}`);
    }
    return value;
  }
}
