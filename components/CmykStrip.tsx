export default function CmykStrip() {
  return (
    <div
      className="flex h-[4px] w-full"
      aria-hidden="true"
    >
      <div className="w-1/4 bg-[#00aeef]" />
      <div className="w-1/4 bg-[#ec008c]" />
      <div className="w-1/4 bg-[#ffcb05]" />
      <div className="w-1/4 bg-black" />
    </div>
  );
}