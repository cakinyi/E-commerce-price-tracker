import Link from 'next/link'
import Image from 'next/image'
import Cookies from "universal-cookie";
import { useEffect, useState } from 'react';

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]


const Navbar = () => {

  const cookies = new Cookies();
  const [token, setToken] = useState('');

  const handleLogout = () =>{
    cookies.set('token', '');
    window.location.reload();
  }

  useEffect(() => {
    setToken(cookies.get('token'));
  }, []);

  let logoutBtn;

  if(token === '' || token === null || token === undefined){
    logoutBtn = '';
  }else{
    logoutBtn = (
      <button onClick={handleLogout} style={{backgroundColor: '#000', color: '#fff', borderRadius: '5px', padding: '5px 10px'}}>
      log out
    </button>
    )
  }

  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href="/" className='flex items-center gap-1'>
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt='logo'
          />

          <p className='nav-logo'>
            E-commerce<span className=' text-primary'>PriceTracker</span>
          </p>

        </Link>

        <div className='flex items-center gap-5'>
          {navIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className='object-contain'
            />

          ))}

          {logoutBtn}
        </div>

      </nav>
    </header>
  )
}

export default Navbar