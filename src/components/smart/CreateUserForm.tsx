'use client';

import { createUserAction } from '$/app/actions';
import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';

export const CreateUserForm = () => {
  return (
    <form className='space-y-4' action={createUserAction}>
      <div className='grid grid-cols-3 gap-4'>
        <div className='space-y-2'>
          <label htmlFor='name'>Name</label>
          <Input id='name' name='name' placeholder='Enter name' />
        </div>
        <div className='space-y-2'>
          <label htmlFor='email'>Email</label>
          <Input id='email' name='email' type='email' placeholder='Enter email' />
        </div>
        <div className='space-y-2'>
          <label htmlFor='age'>Age</label>
          <Input id='age' name='age' type='number' placeholder='Enter age' />
        </div>
      </div>
      <Button type='submit'>Create User</Button>
    </form>
  );
};
