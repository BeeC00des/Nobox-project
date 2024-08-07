"use client";

import { useState } from 'react';
import { UserModel } from "../../../nobox-baas/record-structures/user";

// Define the User interface
interface User {
  firstName: string;
  email: string;
  age: number;
  password: string;
}
interface Data<T>{
    data: T;
    success: boolean;
}

// Define the ReturnObject type with a generic parameter
interface ReturnObject<T> {
    firstName: string;
    email: string;
    age: number;
    password: string;
    // data:any
}

export default function SingleUserForm() {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState<ReturnObject<User> | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`First Name: ${firstName}, Last Name: ${age}, Email: ${email},Password: ${password}`);

    // Basic validation
    if (!firstName || !email || !age || !password) {
      console.error('All fields are required!');
      return;
    }

    try {
      // Call UserModel.insertOne with form data
      const user: ReturnObject<User> = await UserModel.insertOne({
        firstName,
        email,
        age: Number(age),
        password,
      });

      // Set the response state with the returned user object
      setResponse(user);

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='flex w-full min-h-screen items-center justify-center p-24 '>
      <div className="border-2 border-gray-300 h-auto p-3 lg:w-5/12 gap-1 sm:w-full relative">
      <h1 className="pl-3 text-lg bold">Single Userform</h1>
      
      <form className='p-3' onSubmit={handleSubmit}>
        <div className='pb-2'>
          <label className='pr-5'>First Name:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-16'>Email:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-20'>Age:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-8'>Password:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='pt-5'>
        <button className=' absolute bottom-0 right-0 border-2 rounded-lg  border-black-200 text-black bg-white p-2 mr-3' type="submit">Submit</button>
        </div>
       
      </form>
      </div>
      <div className="border-2 border-gray-300 h-auto p-3 lg:w-6/12 sm:w-full">
      <h1 className="pl-3 pb-5 text-lg bold">Single Userform Data Submitted</h1>
      {response && (
        <div className='pl-3'>
          <h2 className='pb-2'>Response:</h2>
          <p className='pb-2'>First Name: {response.firstName}</p>
          <p className='pb-2'>Email: {response.email}</p>
          <p className='pb-2'>Age: {response.age}</p>
          <p className='pb-2'>Password: {response.password}</p>
        
        </div>
      )}
      </div>

      
      </div>
  );
};

// export default UserForm;
