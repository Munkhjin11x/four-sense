import parse from "html-react-parser";
export const Menu = ({ data, title }: { data: MenuProps[]; title: string }) => {
  return (
    <div className="flex flex-col gap-4 py-2 px-10">
      <p className="text-6xl font-bold text-[#488457]">{title}</p>
      <div>
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <div>
              <h3>{item.name}</h3>
              <p>{parse(item.description)}</p>
            </div>

            <p className="text-[#D9864E] text-2xl font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type MenuProps = {
  name: string;
  price: string;
  description: string;
};
