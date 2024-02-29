import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import './styles.css';

const SelectDemo = () => {
  return (
    <Select.Root>
      <Select.Trigger className='SelectTrigger' aria-label='Food'>
        <Select.Value placeholder='Select a fruit…' />
        <Select.Icon className='SelectIcon'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className='SelectContent'>
          <Select.Viewport className='SelectViewport'>
            <Select.Group>
              <Select.Label className='SelectLabel'>Fruits</Select.Label>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>Pineapple</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  (
    {
      children,
      ...props
    }: {
      children: React.ReactNode;
      value: string;
      disabled?: boolean;
    },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item className={'SelectItem'} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='SelectItemIndicator'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectDemo;
