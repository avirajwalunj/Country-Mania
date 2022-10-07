import classes from "./CountriesTable.module.css";
import Link from "next/Link";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";

function SortArrow(props) {
  if (!props.direction) {
    return <></>;
  }
  if (props.direction === "desc") {
    return (
      <div className={classes.button_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={classes.button_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
}

function orderBy(countries, value, direction) {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
}

function CountriesTable(props) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(props.countries, value, direction);

  function switchDirections() {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  }

  function setValueAndDirection(value) {
    switchDirections();
    setValue(value);
  }

  return (
    <div>
      <div className={classes.heading}>
        <div className={classes.heading_flags}></div>
        <button
          className={classes.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow />
        </button>
        <button
          className={classes.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
        <button
          className={classes.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={classes.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={classes.row}>
            <div className={classes.flag}>
              <img src={country.flags.png} />
            </div>
            <div className={classes.name}>{country.name}</div>
            <div className={classes.population}>{country.population}</div>
            <div className={classes.area}>{country.area || 0}</div>
            <div className={classes.gini}>{country.gini || 0}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
