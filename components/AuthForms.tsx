'use client'
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousel from "@/components/HeroCarousel"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import { supabase } from "../lib/client";
import Cookies from "universal-cookie";
import Navbar from "@/components/Navbar";

const AuthForm = () => {
  const cookies = useMemo(() => new Cookies(), []); // Initialize cookies object using useMemo
  const[token, setToken] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[userName, setUserName] = useState('');
  let activeLink;
  const[activeForm, setActiveForm] = useState('');

  console.log(userName, email, password);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getActiveLink = cookies.get("activeLink");
    setToken(cookies.get("token"));
    const defaultActiveLink = getActiveLink || "login";
    setActiveForm((prevActiveForm) => prevActiveForm || defaultActiveLink);
  }, [cookies]); // Include cookies in the dependency array

    if(activeLink === '' || activeLink === null || activeLink === undefined){
        activeLink = 'login';
    }

    async function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault()
  
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
  
        if (error) throw error
        console.log(data)
        setToken(cookies.get('sb-access-token'));
        cookies.set('token', 'token');
      } catch (error) {
        alert(error)
      }
    }
  
    
      async function handleSignUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
    
        try {
          const { data, error } = await supabase.auth.signUp(
            {
              email: email,
              password: password,
              options: {
                data: {
                  full_name: userName,
                }
              }
            }
          )
          if (error) throw error
          alert('Check your email for verification link')
    
          setActiveForm('login')
        } catch (error) {
          alert(error)
        }
      }
    
    console.log(token);
  return (
    <>
        <Navbar />
        {token === 'token' ? (
          <>
          <section className="px-6 md:px-20 py-24">
            <div className="flex max-xl:flex-col gap-16">
              <div className="flex flex-col justify-center">
              <p className="small-text">
                Smart Shopping Starts Here:
                <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
                />
              </p>

              <h1 className="head-text">
                Unleash the Power of
                <span className="text-primary"> PriceTracker</span>

              </h1>

              <p className="mt-6">
                Powerful, self-serve product and growth analytics to help you convert,engage and retain more.
              </p>

              <Searchbar/>
              </div>

              <HeroCarousel/>
            </div>
          </section>
          </>
        ):(
          <>
            {activeForm === 'signup' && (
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="fullname"
                                onChange={(e)=>{setUserName(e.target.value)}}
                                placeholder="Full Name" />

                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                onChange={(e)=>{setEmail(e.target.value)}}
                                placeholder="Email" />

                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                onChange={(e)=>{setPassword(e.target.value)}}
                                placeholder="Password" />
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                placeholder="Confirm Password" />

                            <button
                                type="submit"
                                onClick={handleSignUp}
                                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>

                            <div className="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the 
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Terms of Service
                                </a>
                            </div>
                        </div>

                        <div className="text-grey-dark mt-6">
                            Already have an account? 
                            <a className="no-underline border-b border-blue text-blue" href="#" onClick={()=>{cookies.set('activeLink', 'login'); window.location.reload();}}>
                                Log in
                            </a>.
                        </div>
                    </div>
                </div>
            )}
            {activeForm === 'login' && (
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Login</h1>

                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                onChange={(e)=>{setEmail(e.target.value)}}
                                placeholder="Email" />

                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                onChange={(e)=>{setPassword(e.target.value)}}
                                placeholder="Password" />

                            <button
                                type="submit"
                                onClick={handleLogin}
                                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                            >Login</button>
                        </div>

                        <div className="text-grey-dark mt-6">
                            Don&apos;t have an account?<br/> 
                            <a className="no-underline border-b border-blue text-blue" href="#" onClick={()=>{cookies.set('activeLink', 'signup'); window.location.reload();}}>
                                Sign Up
                            </a>.
                        </div>
                    </div>
                </div>
            )}
          </>
        )
        }
    </>
  )
}

export default AuthForm;