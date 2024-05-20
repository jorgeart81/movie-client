interface Props {
  title: string;
  description: string;
  image: string;
  mpaaRating: string;
  releaseDate: string;
  runtime: number;
}

export const MovieCard = ({
  title,
  description,
  image,
  mpaaRating,
  releaseDate,
  runtime,
}: Props) => {
  return (
    <>
      <div className='relative flex max-w-[300px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md'>
        <div className='relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none'>
          <img src={image} alt={`${title} - image`} />
        </div>

        <div className='p-6'>
          <h4 className='block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
            {title}
          </h4>
          <p className='mt-3 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased'>
            {description}
          </p>
        </div>

        <div className='flex items-center justify-between p-6'>
          <div className='flex gap-3'>
            <p>{releaseDate}</p>
            <p>{runtime}</p>
          </div>
          <p className='block font-sans text-base font-normal leading-relaxed text-inherit antialiased'>
            {mpaaRating}
          </p>
        </div>
      </div>
    </>
  );
};
