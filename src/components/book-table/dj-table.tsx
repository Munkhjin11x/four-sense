export const DjTable = ({ title = "DJ Table" }: { title?: string }) => {
  return (
    <div className="border bg-white w-11 h-[380px] px-14 rounded-xl flex justify-center items-center border-[#000]">
      <p className="text-[#E36C2C] text-lg text-center font-bold">{title}</p>
    </div>
  );
};
