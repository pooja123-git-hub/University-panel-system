import { Injectable, NotFoundException } from '@nestjs/common';
import { FeeRepository } from './repositories/fees.repository';
import { I18nService } from 'nestjs-i18n';
import { GetFeesInput } from './dto/get-fees.input';
import { GetFeeEntity } from './entities/get-fee.entity';
import { GetFeesResponse } from './response/get-fees.response';
import { ListFeesInput } from './dto/list-fees.input';
import {  ListsFeeEntity } from './entities/list-fees-entity';
import { ListFeesResponse } from './response/list-fees.response';


@Injectable()
export class FeeService {
  constructor(
    private readonly feesRepository:FeeRepository,
    private readonly i18n:I18nService
  ){}

    /**
   * @description Get fees detail by id
   * @param getFeesInput
   * @returns
   */
  async getFees(
      getFeesInput:GetFeesInput,
    ): Promise<GetFeeEntity> {
      const fees = await this.feesRepository.getFees(getFeesInput);
  
      if (!fees) {
        throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
      }
      return GetFeesResponse.decode({ fees: fees });
    }

    /**
   * @description list fees details
   * @param listFeesInput
   * @returns
   */
   async listFees(
      listFeesInput: ListFeesInput,
    ): Promise<ListsFeeEntity> {
      const [fees, count] =
        await this.feesRepository.listFees(listFeesInput);
      if (!fees.length)
        throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
  
      return ListFeesResponse.decode({ fees: fees, count: count });
    }
  
}
