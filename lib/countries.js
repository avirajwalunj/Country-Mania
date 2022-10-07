export async function AllCountries() {
  const response = await fetch("https://restcountries.com/v2/all");
  const allCountries = await response.json();
  return allCountries;
}
