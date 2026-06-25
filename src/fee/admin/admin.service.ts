import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminFeesRepository } from '../repositories/admin.repository';
import { AdminCreateFeesInput } from '../dto/admin/admin-create-fees-input';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { I18nService } from 'nestjs-i18n';
import { AdminUpdateFeesInput } from '../dto/admin/admin-update-fees.input';
import { AdminGetFeesInput } from '../dto/admin/admin-get-fees.input';
import { AdminGetFeesResponse } from '../response/admin/admin-get-fees-reposne';
import { AdminListFeesInput } from '../dto/admin/admin-list-fees.input';
import { AdminListFeeEntity } from '../entities/admin/admin-list-fees.entity';
import { AdminListFeesResponse } from '../response/admin/admin-list-fees.response';
import { AdminGetFeeEntity } from '../entities/admin/admin-get-fees.entity';
import { AdminDeleteFeesInput } from '../dto/admin/admin-delete-fees.input';

@Injectable()
export class AdminFeesService {
  constructor(
    private readonly adminfeesRepository: AdminFeesRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin create fees structure for valid courses
   * @param adminCreateFeesInput
   * @returns
   */
  async adminCreateFees(
    adminCreateFeesInput: AdminCreateFeesInput,
  ): Promise<BooleanMessage> {
    await this.adminfeesRepository.adminCreateFees(adminCreateFeesInput);
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('fees.FEES_CREATED_SUCCESSFULLY');
    return response;
  }

  /**
   * @description Admin update fees structure for valid courses
   * @param adminUpdateFeesInput
   * @returns
   */
  async adminUpdateFees(
    adminUpdateFeesInput: AdminUpdateFeesInput,
  ): Promise<BooleanMessage> {
    await this.adminfeesRepository.adminUpdateFees(adminUpdateFeesInput);
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('fees.FEES_UPDATED_SUCCESSFULLY');
    return response;
  }

  /**
   * @description Get fees detail by id
   * @param adminGetFeesInput
   * @returns
   */
  async adminGetFees(
    adminGetFeesInput: AdminGetFeesInput,
  ): Promise<AdminGetFeeEntity> {
    const fees = await this.adminfeesRepository.adminGetFees(adminGetFeesInput);

    if (!fees) {
      throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));
    }
    return AdminGetFeesResponse.decode({ fees: fees });
  }

  /**
   * @description list fees details
   * @param adminListFeesInput
   * @returns
   */
  async adminListFees(
    adminListFeesInput: AdminListFeesInput,
  ): Promise<AdminListFeeEntity> {
    const [fees, count] =
      await this.adminfeesRepository.adminListFees(adminListFeesInput);
    if (!fees.length)
      throw new NotFoundException(this.i18n.t('fees.FEES_NOT_FOUND'));

    return AdminListFeesResponse.decode({ fees: fees, count: count });
  }

  /**
   * @description admin delete fees
   * @param adminDeleteFeesInput
   * @returns
   */
  async adminDeleteFees(
    adminDeleteFeesInput: AdminDeleteFeesInput,
  ): Promise<BooleanMessage> {
    const subject =
      await this.adminfeesRepository.adminDeleteFees(adminDeleteFeesInput);
    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t('fees.FEES_DELETED_SUCEESSFULLY');

    return response;
  }
}
