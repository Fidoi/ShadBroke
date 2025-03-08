import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth.config';
import { ReviewForm } from './ReviewForm';
import { getReviewsByProductId } from '@/actions';
import { ReviewItem } from './ui/ReviewItem';
import { MessagesSquare, Star } from 'lucide-react';

export async function Review({ productId }: { productId: string }) {
  const session = await auth();
  const reviews = await getReviewsByProductId(productId);

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(({ rating }) => ratingCounts[rating - 1]++);
  const totalReviews = reviews.length;
  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews ? Math.round((count / totalReviews) * 100) : 0
  );

  return (
    <div className='mx-auto max-w-7xl py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-row gap-x-3'>
            <MessagesSquare />
            Reseñas
          </CardTitle>
          <CardDescription>Basado en {totalReviews} opiniones</CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
            <div className='space-y-2 md:w-1/3'>
              {[5, 4, 3, 2, 1].map((stars, index) => (
                <div key={stars} className='flex items-center'>
                  <span className='w-12 text-sm font-medium'>
                    <div className='flex justify-center items-center'>
                      <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                      {stars}{' '}
                    </div>
                  </span>
                  <Progress
                    value={ratingPercentages[4 - index]}
                    className='mx-3 flex-1'
                  />
                  <div className='flex flex-row'>
                    <span className='w-10 text-right text-sm text-muted-foreground '>
                      {ratingCounts[4 - index]}
                    </span>
                    <span className='w-10 text-right text-sm text-muted-foreground '>
                      ({ratingPercentages[4 - index]}%){' '}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Separator orientation='vertical' className='hidden md:block' />

            <div className='md:w-2/3'>
              <ReviewForm session={session} productId={productId} />
            </div>
          </div>

          <Separator className='my-6' />

          <div className='space-y-6'>
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={{
                  id: review.id,
                  comment: review.comment,
                  rating: review.rating,
                  createdAt: review.createdAt,
                  user: {
                    name: review.user.name,
                    image: review.user.image,
                  },
                }}
                session={session}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
