import SearchRounded from "@material-ui/icons/SearchRounded";
import classes from "./SearchInput.module.css";

function SearchInput({ ...rest }) {
  return (
    <div className={classes.wrapper}>
      <SearchRounded color="inherit" />
      <input className={classes.input} {...rest} />
    </div>
  );
}

export default SearchInput;
