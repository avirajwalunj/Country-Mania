import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  const country = await res.json();

  return country;
};

function CountrySingle({ country }) {
  // console.log(Object.values(country[0].gini)[0]);

  const [borders, setBorders] = useState([]);
  const getBorders = async () => {
    const borders = await Promise.all(
      country[0].borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders);

  return (
    <Layout title={country[0].name.common}>
      <div className={classes.container}>
        <div className={classes.container_left}>
          {" "}
          <div className={classes.overview_panel}>
            <img src={country[0].flags.svg} alt={country[0].name.common} />

            <h1 className={classes.overview_name}>{country[0].name.common}</h1>
            <div className={classes.overview_region}>{country[0].region}</div>

            <div className={classes.overview_numbers}>
              <div className={classes.overview_population}>
                <div className={classes.overview_value}>
                  {country[0].population}
                </div>
                <div className={classes.overview_label}>POPULATION</div>
              </div>

              <div className={classes.overview_area}>
                <div className={classes.overview_value}>{country[0].area}</div>
                <div className={classes.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container_right}>
          <div className={classes.details_panel}>
            <h4 className={classes.details_panel_heading}>Details</h4>

            <div className={classes.details_panel_row}>
              <div className={classes.details_panel_label}>Capital</div>
              <div className={classes.details_panel_value}>
                {country[0].capital}
              </div>
            </div>

            <div className={classes.details_panel_row}>
              <div className={classes.details_panel_label}>Subregion</div>
              <div className={classes.details_panel_value}>
                {country[0].subregion}
              </div>
            </div>

            <div className={classes.details_panel_row}>
              <div className={classes.details_panel_label}>Languages</div>
              <div className={classes.details_panel_value}>
                {Object.values(country[0].languages)
                  .map((name) => name)
                  .join(", ")}
              </div>
            </div>

            <div className={classes.details_panel_row}>
              <div className={classes.details_panel_label}>Currencies</div>
              <div className={classes.details_panel_value}>
                {Object.values(country[0].currencies)
                  .map((x) => x.name)
                  .join(", ")}
              </div>
            </div>

            <div className={classes.details_panel_row}>
              <div className={classes.details_panel_label}>Native Name</div>
              <div className={classes.details_panel_value}>
                {Object.values(country[0].name.nativeName)
                  .map((x) => x.official)
                  .join(", ")}
              </div>
            </div>

            <div className={classes.details_panel_borders}>
              <div className={classes.details_panel_borders_label}>
                Neigbouring Countries
              </div>
              <div className={classes.details_panel_borders_containers}>
                {borders &&
                  borders.map((x) => (
                    <div
                      key={x[0].name}
                      className={classes.details_panels_borders_country}
                    >
                      <img src={x[0].flags.png} alt={x[0].name.common} />
                      <div className={classes.details_panels_borders_name}>
                        {x[0].name.common}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CountrySingle;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const country = await getCountry(params.id);

  return { props: { country } };
}
