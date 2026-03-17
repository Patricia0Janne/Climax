import { getWeekday } from "../../logica/date";
import "./styles.css";

const ForecastCard = ({ date, min, max, description, condition }) => {
  return (
    <section className="forecast-card">
      <p>
        {getWeekday(date)}
        <span>({date})</span>
      </p>
      <img src={`./icons-weather/${condition}.svg`} alt={description} />
      <span className="min-max">
        {min}/{max}°
      </span>
    </section>
  );
};

export default ForecastCard;
