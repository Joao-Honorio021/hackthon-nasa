import "./components/Menu.jsx";
import Menu from "./components/Menu.jsx";
import Heading from "./components/heading.jsx";
export default function Home() {
  return (
    <div>
      <Menu />
      <Heading />
      <main className="p-4"></main>
    </div>
  );
}
