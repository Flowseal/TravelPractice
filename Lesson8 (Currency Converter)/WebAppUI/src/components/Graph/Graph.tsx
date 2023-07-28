import "./Graph.css";
import { useState } from "react";
import { CurrencyPrice } from "../../types/CurrencyPrice";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
const graphOptions = {
    responsive: true,
    plugins: {
        legend: {
          display: false
        }
    }
};

const enum TimeRange {
    OneMinute=60,
    TwoMinutes=120,
    ThreeMinutes=180,
    FourMinutes=240,
    FiveMinutes=300
};

type GraphProps = {
    currencyPair: string;
    pricesHistory: CurrencyPrice[];
};

export default function Graph({currencyPair, pricesHistory}: GraphProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.FiveMinutes);
    const graphLabels: string[] = []; 
    const currentDate: Date = new Date();

    for (let i = pricesHistory.length - 1; i > 0; i--)
    {
        const priceHistoryDateTime = pricesHistory[i].dateTime;
        if ((currentDate.getTime() - priceHistoryDateTime.getTime()) / 1000 > timeRange)
        {
            break;
        }

        const hours = ("0" + priceHistoryDateTime.getHours()).slice(-2);
        const minutes = ("0" + priceHistoryDateTime.getMinutes()).slice(-2);
        const seconds = ("0" + priceHistoryDateTime.getSeconds()).slice(-2);
        graphLabels.splice(0, 0, `${hours}:${minutes}:${seconds}`);
    }

    const data = {
        labels: graphLabels,
        datasets: [
        {
            label: currencyPair,
            data: graphLabels.map((label, index) => pricesHistory[pricesHistory.length - 1 - index].price),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
        ]
    };

    return (
        <div className="converter__graph">
            <div className="time-buttons">
                <button onClick={() => setTimeRange(TimeRange.OneMinute)}>1min</button>
                <button onClick={() => setTimeRange(TimeRange.TwoMinutes)}>2min</button>
                <button onClick={() => setTimeRange(TimeRange.ThreeMinutes)}>3min</button>
                <button onClick={() => setTimeRange(TimeRange.FourMinutes)}>4min</button>
                <button onClick={() => setTimeRange(TimeRange.FiveMinutes)}>5min</button>
            </div>
            <Line options={graphOptions} data={data} />
        </div>
    );
};