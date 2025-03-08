import Link from 'next/link';

interface Props {
  description: string;
}

export const PageNotFound = ({ description }: Props) => {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        <h2 className={` antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>{description}</p>
        <p className='font-light'>
          <span>Puedes regresar al </span>
          <Link href='/' className='font-normal hover:underline transition-all'>
            Inicio
          </Link>
        </p>
      </div>
    </div>
  );
};
