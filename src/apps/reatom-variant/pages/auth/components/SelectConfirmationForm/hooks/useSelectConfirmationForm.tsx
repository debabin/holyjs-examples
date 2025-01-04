import type { CheckedState } from '@radix-ui/react-checkbox';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCtx } from '@reatom/npm-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { selectConfirmationSubmit } from '../../../model';
import { selectConfirmationEmailSchema, selectConfirmationPhoneSchema } from '../constants';

interface SelectConfirmationForm {
  resource: string;
}

export const useSelectConfirmationForm = () => {
  const ctx = useCtx();

  const [selectConfirmationFormStage, setSelectConfirmationFormStage] = React.useState<
    'form' | 'select'
  >('select');
  const [selectedResource, setSelectedResource] = React.useState<'email' | 'phone'>('phone');
  const [termsChecked, setTermsChecked] = React.useState<CheckedState>(false);

  const onSelectContinue = () => setSelectConfirmationFormStage('form');

  const selectConfirmationForm = useForm<SelectConfirmationForm>({
    resolver: zodResolver(
      selectedResource === 'email' ? selectConfirmationEmailSchema : selectConfirmationPhoneSchema
    )
  });

  const onFormBack = () => {
    selectConfirmationForm.reset();
    setSelectConfirmationFormStage('select');
  };

  const onSubmit = selectConfirmationForm.handleSubmit((values) =>
    selectConfirmationSubmit(ctx, { values, selectedResource })
  );

  return {
    form: selectConfirmationForm,
    state: {
      termsChecked,
      selectedResource,
      selectConfirmationFormStage
    },
    functions: { setTermsChecked, setSelectedResource, onSelectContinue, onFormBack, onSubmit }
  };
};
