import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import SearchInput from "../components/searchInput/SearchInput";
import { AllCountries } from "../lib/countries";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div>
      <Layout title="Country Mania">
        <div className={styles.input_container}>
          <div className={styles.count}>Found {countries.length} countries</div>
          <div className={styles.input}>
            <SearchInput
              placeholder="Filter by Name, Region or SubRegion"
              onChange={onInputChange}
            />
          </div>
        </div>
        <CountriesTable countries={filteredCountries} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const countries = await AllCountries();

  return {
    props: {
      countries,
    },
  };
}
