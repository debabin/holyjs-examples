import { PatternFormat } from 'react-number-format';

import { SpinnerIcon } from '@/components/icons';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@/components/ui';
import { IDS } from '@/utils';

import { useSelectConfirmationForm } from './hooks/useSelectConfirmationForm';

export const SelectConfirmationForm = () => {
  const { state, functions, form } = useSelectConfirmationForm();

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      {state.selectConfirmationFormStage === 'select' && (
        <>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Choose resource for otp code</h1>
            <p className='text-sm text-muted-foreground'>We sent you a code to your resource</p>
          </div>

          <RadioGroup
            className='flex flex-col space-y-2'
            defaultValue={state.selectedResource}
            onValueChange={(value: 'phone' | 'email') => functions.setSelectedResource(value)}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='email' id={IDS.RADIO_BUTTON.EMAIL} />
              <Label htmlFor='email'>email</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='phone' id={IDS.RADIO_BUTTON.PHONE} />
              <Label htmlFor='phone'>phone</Label>
            </div>
          </RadioGroup>

          <div className='items-top flex space-x-2'>
            <Checkbox
              id={IDS.CHECKBOX.TERMS}
              checked={state.termsChecked}
              onCheckedChange={(checked) => functions.setTermsChecked(checked)}
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Accept terms and conditions
              </label>
              <p className='text-sm text-muted-foreground'>
                You agree to our{' '}
                <a href='/terms' className='underline underline-offset-4 hover:text-primary'>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href='/privacy' className='underline underline-offset-4 hover:text-primary'>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <Button
            id={IDS.BUTTON.CONTINUE}
            className='w-full'
            disabled={!state.termsChecked}
            onClick={functions.onSelectContinue}
          >
            Continue
          </Button>
        </>
      )}
      {state.selectConfirmationFormStage === 'form' && (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Two factor authentication</h1>
            <p className='text-sm text-muted-foreground'>We sent you a code to your email</p>
          </div>
          <div className='grid gap-2'>
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  functions.onSubmit();
                }}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='resource'
                  render={({ field }) => (
                    <FormItem>
                      <Label className='sr-only' htmlFor='otp'>
                        {state.selectedResource === 'email' ? 'Email' : 'Phone'}
                      </Label>
                      <FormControl>
                        <>
                          {state.selectedResource === 'email' && (
                            <Input id={IDS.INPUT.EMAIL} placeholder='write email' {...field} />
                          )}
                          {state.selectedResource === 'phone' && (
                            <PatternFormat
                              id={IDS.INPUT.PHONE}
                              format='+7 ### ### ####'
                              allowEmptyFormatting
                              customInput={Input}
                              {...field}
                            />
                          )}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={state.loading}
                  id={IDS.BUTTON.CONFIRM}
                >
                  {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Confirm
                </Button>
                <Button
                  id={IDS.BUTTON.BACK}
                  type='button'
                  variant='outline'
                  className='w-full'
                  disabled={state.loading}
                  onClick={functions.onFormBack}
                >
                  {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Back
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
