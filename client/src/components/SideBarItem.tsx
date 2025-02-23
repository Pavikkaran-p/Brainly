import { ReactElement } from "react";

const SideBarItem = ({text,icon}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 delay-0 transition-all duration-100 max-w-48 rounded pl-4">
      <div className="pr-2 pl-2">
        {icon}
      </div>
      <div className="">
        {text}
      </div>
    </div>
  )
}

export default SideBarItem