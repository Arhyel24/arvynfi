import Link from "next/link";

export function NavBar(){
    return (
      <div className="w-full fixed flex items-center justify-center">
        <div className="text-white w-full p-4 md:my-3 flex gap-4 flex-col justify-between md:items-center relative md:w-[90%] md:rounded-xl md:border md:flex-row">
          <Link href={"#"}>
            <h1 className="font-bold text-xl">ArvynFi</h1>
          </Link>
          <div>
            <ul className="flex gap-4 flex-col">
              <li>
                <Link href={"#"}>Home</Link>
              </li>
              <li>
                <Link href={"#"}>About</Link>
              </li>
              <li>
                <Link href={"#"}>Docs</Link>
              </li>
              <li>
                <Link href={"#"}>Support</Link>
              </li>
            </ul>
          </div>
          <button className="p-2 text-white md:hidden fixed my-auto right-2">
            CL
          </button>
        </div>
      </div>
    );
}