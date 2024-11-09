export function Layouts({ children }) {
  return (
    <div
      className="flex flex-col md:flex-row"
      style={{ background: "#F6F6F6" }}
    >
      <div className="hidden md:flex">

      </div>
      <div className="w-full">
        <div className="grid h-screen">
          <div className="flex md:hidden">

          </div>
          <div className="pt-8 overflow-y-auto"> {children}</div>
        </div>
      </div>

    </div>
  );
}
