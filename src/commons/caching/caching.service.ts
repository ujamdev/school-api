import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, option?: any) {
    await this.cacheManager.set(key, value, option);
  }
}
