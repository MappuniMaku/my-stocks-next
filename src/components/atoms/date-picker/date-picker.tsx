import { FC } from 'react';
import { DatePicker as NextUIDatePicker, DatePickerProps } from '@nextui-org/react';

export type IDatePickerProps = DatePickerProps;

export const DatePicker: FC<IDatePickerProps> = (props) => <NextUIDatePicker {...props} />;
