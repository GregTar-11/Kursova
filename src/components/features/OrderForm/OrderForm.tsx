'use client';

import { IOrderData, orderSchema } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { OrderService } from '@/services/order.service';
import { notifier } from '@/lib/notifier';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface OrderFormProps {
  camperId?: string;
}

export default function OrderForm({ camperId = '' }: OrderFormProps) {
  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<IOrderData>(
    async (data) => {
      await OrderService.create(data);
      notifier.success("Замовлення прийнято! Ми зв'яжемося з вами найближчим часом.");
    },
    orderSchema,
    { camperId, clientName: '', clientPhone: '' },
  );

  return (
    <Form methods={methods} onSubmit={handleSubmit} variant="full">
      <input type="hidden" {...methods.register('camperId')} />

      <Input name="clientName" label="Ваше ім'я" placeholder="Іван Петренко" />

      <Input name="clientPhone" label="Номер телефону" placeholder="+380XXXXXXXXX" type="tel" />

      <Button
        type="submit"
        variant="primary"
        size="big"
        disabled={!isDirty || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Відправлення...' : 'Замовити'}
      </Button>
    </Form>
  );
}
