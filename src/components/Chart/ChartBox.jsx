import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const ChartBox = ({props, data}) => {
  return (
    <div className="flex flex-col sm:flex-row h-full max-h-[100%]">
      <div className="flex flex-[3_3_0%] flex-col justify-between gap-5 sm:gap-0">
        <div className="flex items-center gap-[10px]">
          <img src={props.icon} alt="" />
          <span className="font-medium sm:font-bold text-sm sm:text-lg " style={{ color: 'white' }}>{data?.title}</span>
        </div>
        <h1 className=" text-base sm:text-lg md:text-xl lg:text-2xl font-bold" style={{ color: 'white' }}>{data?.number}</h1>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="flex flex-[2_2_0%] flex-col justify-center">
        <div className="w-full h-full">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col text-right">
          <span
            className="font-bold text-base sm:text-lg md:text-xl "
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="text-sm"style={{ color: "white" }}>this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
