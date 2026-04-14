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
      SELECT id FROM users WHERE email = ${session.user.email}
    `;

    if (!user[0]) {
      return 'User not found.';
    }

    const userId = user[0].id;

    const productId = formData.get('productId') as string;
    const rating = Number(formData.get('rating'));
    const title = formData.get('title') as string;
    const comment = formData.get('comment') as string;

    if (!productId || rating < 1 || rating > 5 || !title?.trim()) {
      return 'Missing required fields.';
    }

    if (!title?.trim()) {
      return 'Title is required.';
    }

    await sql`
      INSERT INTO reviews (product_id, user_id, rating, title, comment)
      VALUES (${productId}, ${userId}, ${rating}, ${title}, ${comment})
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET
        rating = EXCLUDED.rating,
        title = EXCLUDED.title,
        comment = EXCLUDED.comment,
        created_at = NOW()
    `;

    revalidatePath(`/products/${productId}`);

    return 'Review saved successfully.';
  } catch (error) {
    console.error('Database Error:', error);
    return 'Something went wrong. Please try again.';
  }
}

export async function deleteReview(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return 'You must be logged in.';
    }

    const productId = formData.get('productId') as string;

    const user = await sql`
      SELECT id FROM users WHERE email = ${session.user.email}
    `;

    if (!user[0]) {
      return 'User not found.';
    }

    const userId = user[0].id;

    await sql`
      DELETE FROM reviews
      WHERE product_id = ${productId}
      AND user_id = ${userId}
    `;

    revalidatePath(`/products/${productId}`);

    return 'Review deleted successfully.';
  } catch (error) {
    console.error('Delete Review Error:', error);
    return 'Failed to delete review.';
  }
}