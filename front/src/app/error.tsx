'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from '@/components/ui/button';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter();
    function handleReset()
    {
        startTransition(() =>
        {
            // calling order does not matter
            reset();
            router.refresh();
        });
    }
 
  return (
    <div className='flex justify-center items-center min-h-80'>
        <div className='text-center space-y-4'>
            <p className='text-2xl font-semibold'>No s’ha pogut carregar la <span className='whitespace-nowrap'>informació :(</span></p>
            <p className='text-xs'>Codi de seguiment: {error.digest}</p>
            <Button
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => handleReset()
                }
            >Torna-ho a provar</Button>
      </div>
    </div>
  )
}