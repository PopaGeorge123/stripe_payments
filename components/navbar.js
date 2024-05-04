import Image from 'next/image';
import logo from '../public/assets/logo/topia_logo.svg';
import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center mx-5">
          <Image src={logo} 
            alt="Your Logo" 
            width={50} height={50} 
            className="object-contain" />
            <Link
              href='/'
            >
              <h1 className='text-neutral-50 text-2xl mx-4'>Topia Rank</h1>
            </Link>
        </div>
        <div className='flex items-center justify-between'>
              <Link
                href='/create'
                className='mx-5 text-l text-white'
              >Upload Yours</Link>
              <Link
                href='/info'
                className='mx-5 text-l text-white'
              >Info</Link>
            </div>
      </div>
    </nav>
  );
};

export default Navbar;
