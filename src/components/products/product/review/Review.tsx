// app/reviews/page.tsx (por ejemplo)
import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const Review = () => {
  return (
    <div className='mx-auto max-w-7xl py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>Based on 1624 reviews</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Sección superior: promedio de estrellas y botón para escribir reseña */}
          <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
            {/* Distribución de estrellas */}
            <div className='space-y-2 md:w-1/2'>
              {/* 5 estrellas */}
              <div className='flex items-center'>
                <span className='w-12 text-sm font-medium'>5 star</span>
                <Progress value={63} className='mx-3 flex-1' />
                <span className='w-10 text-right text-sm text-muted-foreground'>
                  63%
                </span>
              </div>
              {/* 4 estrellas */}
              <div className='flex items-center'>
                <span className='w-12 text-sm font-medium'>4 star</span>
                <Progress value={24} className='mx-3 flex-1' />
                <span className='w-10 text-right text-sm text-muted-foreground'>
                  24%
                </span>
              </div>
              {/* 3 estrellas */}
              <div className='flex items-center'>
                <span className='w-12 text-sm font-medium'>3 star</span>
                <Progress value={6} className='mx-3 flex-1' />
                <span className='w-10 text-right text-sm text-muted-foreground'>
                  6%
                </span>
              </div>
              {/* 2 estrellas */}
              <div className='flex items-center'>
                <span className='w-12 text-sm font-medium'>2 star</span>
                <Progress value={1} className='mx-3 flex-1' />
                <span className='w-10 text-right text-sm text-muted-foreground'>
                  1%
                </span>
              </div>
              {/* 1 estrella */}
              <div className='flex items-center'>
                <span className='w-12 text-sm font-medium'>1 star</span>
                <Progress value={2} className='mx-3 flex-1' />
                <span className='w-10 text-right text-sm text-muted-foreground'>
                  2%
                </span>
              </div>
            </div>

            {/* Separador vertical en pantallas medianas o grandes */}
            <Separator
              orientation='vertical'
              className='hidden h-auto md:block'
            />

            {/* Sección para invitar a escribir una reseña */}
            <div className='md:w-1/2'>
              <p className='mb-2 text-sm font-medium'>Share your thoughts</p>
              <Button>Write a review</Button>
            </div>
          </div>

          <Separator className='my-6' />

          {/* Reseñas individuales */}
          <div className='space-y-6'>
            {/* Reseña 1 */}
            <div>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage
                    src='https://via.placeholder.com/40'
                    alt='Avatar de Emily Selman'
                  />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold'>Emily Selman</p>
                  <div className='flex items-center'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className='h-4 w-4 text-yellow-500' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                This is the bag of my dreams! I took it on my last vacation and
                was able to fit an absurd amount of snacks for the many long and
                hungry flights.
              </p>
            </div>

            <Separator />

            {/* Reseña 2 */}
            <div>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage
                    src='https://via.placeholder.com/40'
                    alt='Avatar de Hector Gibbons'
                  />
                  <AvatarFallback>HG</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold'>Hector Gibbons</p>
                  <div className='flex items-center'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className='h-4 w-4 text-yellow-500' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                Before getting the Ruck Snack, I struggled my whole life with
                pulverized snacks, endless crumbs, and other heartbreaking snack
                catastrophes. Now, I can store my snacks with confidence and
                style!
              </p>
            </div>

            <Separator />

            {/* Reseña 3 */}
            <div>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage
                    src='https://via.placeholder.com/40'
                    alt='Avatar de Mark Edwards'
                  />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold'>Mark Edwards</p>
                  <div className='flex items-center'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className='h-4 w-4 text-yellow-500' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                I love how versatile this bag is. It can hold anything ranging
                from cookies that come in trays to cookies that come in tins.
              </p>
            </div>
          </div>

          {/* Sección para enviar tu propia reseña */}
          <Separator className='my-6' />
          <div className='mt-6'>
            <h3 className='mb-4 text-lg font-semibold'>Deja tu reseña</h3>
            <form className='space-y-4'>
              <div>
                <label htmlFor='rating' className='block text-sm font-medium'>
                  Rating
                </label>
                <select
                  id='rating'
                  name='rating'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                >
                  <option value='5'>5 Stars</option>
                  <option value='4'>4 Stars</option>
                  <option value='3'>3 Stars</option>
                  <option value='2'>2 Stars</option>
                  <option value='1'>1 Star</option>
                </select>
              </div>
              <div>
                <Label htmlFor='comment' className='block text-sm font-medium'>
                  Comment
                </Label>
                <textarea
                  id='comment'
                  name='comment'
                  rows={4}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='Write your review here...'
                />
              </div>
              <Button type='submit'>Submit Review</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
