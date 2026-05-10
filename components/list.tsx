export default function ItemList({ children}: { children :React.ReactNode}){
    return(
        <div className=" flex flex-row items-center w-65 my-4">
            <div className="h-7 w-12 bg-mainYellow rounded-full mx-3"></div>
            <p className="text-secondaryWhite/80 font-thin text-xs">{children}</p>
        </div>
    );
}