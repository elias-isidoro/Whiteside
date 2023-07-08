import { getAuthSession } from "@/lib/auth";
import StoreLogo from "./StoreLogo";
import UserAccountNav from "./UserAccountNav";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";

interface Props {};

const NavBar = async ({}: Props) => {

  const session = await getAuthSession()

  return (
    <div className="fixed top-0 inset-x-0 min-w-[280px] h-fit bg-white border-b border-gray-300 z-[10]">
      <div className="h-[3px] w-full bg-blue-400"/>
      <div className="container max-w-7xl h-[55px] mx-auto flex items-center justify-between gap-2">
        
        <StoreLogo/>
        <MenuBar/>
        <SearchBar/>
        <UserAccountNav session={session}/>

      </div>
    </div>
  )
};

export default NavBar;