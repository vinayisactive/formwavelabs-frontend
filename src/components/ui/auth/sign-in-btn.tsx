import Link from 'next/link';

const SignIn = () => {
  return (
   <Link href={`/sign-in`} className='border px-3 py-1 flex justify-center items-center' >
       Sign in
   </Link>
  )
}

export default SignIn; 
