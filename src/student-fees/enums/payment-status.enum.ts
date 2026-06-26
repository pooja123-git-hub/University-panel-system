import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
}

registerEnumType(PaymentStatus, { name: 'PaymentStatus' });
