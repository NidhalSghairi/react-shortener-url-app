import { Button, Grid, TextField } from "@mui/material";
import React from "react";

type ShortenedUrlProps = {
  title: string;
  inputPlaceholder: string;
  buttonTitle: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  action: () => void;
  text: string;
};

const ShortenedUrl: React.FC<ShortenedUrlProps> = ({
  title,
  inputPlaceholder,
  buttonTitle,
  value,
  onChange,
  action,
  text,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>{title}</h1>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="text"
            placeholder={inputPlaceholder}
            value={value}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={"flex-start"}>
          <Button variant="contained" onClick={action}>
            {buttonTitle}
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <div>{text}</div>
      </Grid>
    </Grid>
  );
};

export default ShortenedUrl;
