import { Link } from "react-router-dom";

function Home(){

 return(

 <div className="flex flex-col items-center justify-center h-screen">

 <h1 className="text-4xl font-bold mb-6">
 Knowledge System
 </h1>

 <p className="mb-6">
 Store and organize your knowledge
 </p>

 <div className="flex gap-4">

 <Link
  to="/login"
  className="bg-black text-white px-4 py-2"
 >
  Login
 </Link>

 <Link
  to="/register"
  className="border px-4 py-2"
 >
  Register
 </Link>

 </div>

 </div>

 );

}

export default Home;
