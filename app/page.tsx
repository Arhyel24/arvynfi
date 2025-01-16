import { NavBar } from "./_components/navbar";
import { Header } from "./_components/header";
import { ChooseUs } from "./_components/why-choose-us";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-20"></div>
      <Header />
      <ChooseUs />
    </>
  );
}
