import BrainlyIcon from "../icons/BrainlyIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YtIcon from "../icons/YtIcon"
import SideBarItem from "./SideBarItem"

const SideBar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <h1 className="flex text-2xl pt-4 items-center" >
        <div className="pr-2 text-purple-600">
        <BrainlyIcon/>
        </div>
        Brainly
        </h1>
      <div className="pt-8 pl-4">
        <SideBarItem text="Twitter" icon={<TwitterIcon/>} />
        <SideBarItem text="Youtube" icon={<YtIcon/>} />
      </div>
    </div>
  )
}

export default SideBar