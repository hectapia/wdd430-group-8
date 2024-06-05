'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
 

export type State = {
  errors?: {
    id?: string[];
    customerId?: string[];
    amount?: string[];
    status?: string[];
    date?: string[];
    fname?: string[];
    lname?: string[];
    email?: string[];
    story?: string[];
    image_url_artisan?: string[];
    password?: string[];
  }
  message?: string | null;
};


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
 
interface CloudinaryResponse {
  secure_url: string;
}


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


export async function addArtisan(prevState: State | undefined, formData: FormData): Promise<State | undefined> {

  const artisanImg = formData.get('image_url_artisan') as File;
  const artisanImgBytes = await artisanImg.arrayBuffer();
  const artisanImgBuffer = Buffer.from(artisanImgBytes);

  const artisanImgResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result as CloudinaryResponse);
        }
      }).end(artisanImgBuffer);
  });
  
  //console.log(response.secure_url);
  const artisanImgUrl = artisanImgResponse.secure_url;

    const { lname, fname, email, story, image_url_artisan, password } = AddArtisan.parse({
          lname: formData.get('lname'),
          fname: formData.get('fname'),
          email: formData.get('email'),
          story: formData.get('story'),
          image_url_artisan: artisanImg.name !== 'undefined' ? artisanImgResponse.secure_url : '/sellers/noimage.png',
          password: formData.get('password'),
      });


    // Test it out:
    console.log(lname);
    console.log(fname);
    console.log(email);
    console.log(story);
    console.log(image_url_artisan);
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);
      
    await sql`
        INSERT INTO artisans (lname, fname, email, story, category, image_url_artisan, password)
        VALUES (${lname}, ${fname}, ${email}, ${story}, 'Painter', ${image_url_artisan}, ${hashedPassword})
    `;
    
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