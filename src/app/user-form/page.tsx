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

export default function UserForm() {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState<ReturnObject<User> | null>(null);


  // Handle form submission

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

  const toggleForm = () => {
    setIsLoading(!isLoading);
  };


  return (
    <div className='flex w-full min-h-screen items-center justify-center p-24 '>
      <div className="border-2 border-gray-300 h-auto p-3 lg:w-6/12 sm:w-full">
      <button onClick={toggleForm} className='border-2 border-gray-200 bg-white rounded-lg text-black p-3'>Add a Userform {isLoading ? 'Hide Form' : 'Show Form'}</button>
      {isLoading && (<form onSubmit={handleSubmit} className='py-2'>
        <div className='pb-2'>
          <label className='pr-5'>First Name:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-5'>Email:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-5'>Age:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div className='pb-2'>
          <label className='pr-5'>Password:</label>
          <input className=' border-2 rounded-lg  border-gray-200 p-2 focus:outline-none '
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className=' border-2 rounded-lg  border-black-200 text-black bg-white p-2' type="submit">Submit</button>
      </form>
      )}
      </div>
      <div className="border-2 border-gray-300 h-auto p-3 lg:w-6/12 sm:w-full">
      {response && (
        <div className=''>
          <h2>Response:</h2>
          <p>First Name: {response.firstName}</p>
          <p>Email: {response.email}</p>
          <p>Age: {response.age}</p>
          <p>Password: {response.password}</p>
          {/* <p>Success: {response.success ? 'Yes' : 'No'}</p> */}
        </div>
      )}
      </div>

      
      </div>
  );
};

// export default UserForm;
