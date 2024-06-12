import { Typography } from "@mui/material";

const EmptyLine = () => (
  <Typography
    sx={{
      fontSize: "24px",
      fontWeight: "bold",
      margin: "20px 0px 10px",
      textAlign: "center",
    }}
  >
    Упс... Тут пусто :/{" "}
  </Typography>
);

export default EmptyLine;
