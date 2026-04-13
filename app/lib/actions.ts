'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
 

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong. Please try again.';
      }
    }
    throw error;
  }
}


export async function createReview(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return 'You must be logged in to create a review.';
    }

    const user = await sql`
      SELECT * FROM users WHERE email = ${session.user.email}
    `;
    if (user.length === 0) {
      return 'User not found.';
    }

    const userId = user[0].id;

    const productId = formData.get('product_id') as string;
    const rating = Number(formData.get('rating'));
    const title = formData.get('title') as string;
    const comment = formData.get('comment') as string;

    if (!productId || !rating || !title) {
      return 'Missing required fields.';
    }

    await sql`
      INSERT INTO reviews (product_id, user_id, rating, title, comment)
      VALUES (${productId}, ${userId}, ${rating}, ${title}, ${comment})
      ON CONFLICT (product_id, user_id) DO NOTHING
    `;

    revalidatePath(`/products/${productId}`);

    return 'Review created successfully.';
  } catch (error) {
    console.error('Database Error:', error);
    return 'Something went wrong. Please try again.';
  }
}