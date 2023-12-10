import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='sticky top-0 flex flex-row justify-between align-middle font-thin text-2xl mt-4 text-white
     bg-gray-500 md:mx-10 p-3 font-mono'>
      <Link to="/Home"><h1 className="underline">Form's</h1></Link>
      <Link to="/submission"><h1 className="underline">Submissions</h1></Link>
    </div>
  )
}

export default Navbar