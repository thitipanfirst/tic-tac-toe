import Navbar from "@/components/Navbar";

export function Layouts({ children }) {
  return (
    <div
      className="flex flex-col md:flex-row"
      style={{ background: "#F6F6F6" }}
    >
      <div className="hidden md:flex">

      </div>
      <div className="w-full">
        <div className="flex flex-col h-screen">
          <div className="flex">
            <Navbar />
          </div>
          <div className="flex h-full overflow-y-auto"> {children}</div>
        </div>
      </div>

    </div>
  );
}
