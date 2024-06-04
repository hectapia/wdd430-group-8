'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
  story: z.string(),
  image_url_artisan: z.string(),
  password: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    // Test it out:
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    console.log(amountInCents);
    console.log(typeof amount);
    console.log(date);

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const AddArtisan = FormSchema.omit({ id: true, customerId: true,  amount: true, status: true, date: true});


export async function addArtisan(formData: FormData) {
    const { lname, fname, email, story, image_url_artisan, password } = AddArtisan.parse({
          lname: formData.get('lname'),
          fname: formData.get('fname'),
          email: formData.get('email'),
          story: formData.get('story'),
          image_url_artisan: formData.get('image_url_artisan'),
          password: formData.get('password'),
      });
    // Test it out:
    console.log(lname);
    console.log(fname);
    console.log(email);
    console.log(story);
    console.log(image_url_artisan);
    console.log(password);
      {/*}
    await sql`
        INSERT INTO invoices (lname, fname, email, story, image_url_artisan, password)
        VALUES (${lname}, ${fname}, ${email}, ${story}, ${image_url_artisan}, ${password})
    `;
    */}
    revalidatePath('/artisans');
    redirect('/artisans');
}

  // Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }