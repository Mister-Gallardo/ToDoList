import { Box, Typography, Checkbox } from "@mui/material";

const ToDo = ({
  elem,
  SetCompleted,
}: {
  elem: { id: number; title: string; completed: boolean };
  SetCompleted: (id: number) => void;
}) => {
  return (
    <Box
      data-testid="todo-elem"
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        borderBottom: "1px solid rgba(165, 165, 165, 0.55)",
      }}
    >
      <Checkbox
        checked={elem.completed}
        color="success"
        size="large"
        onClick={() => SetCompleted(elem.id)}
      ></Checkbox>
      <Typography
        sx={{
          fontSize: "25px",
          fontFamily: "Lato sans-serif",
          color: "rgb(95 95 95)",
          fontWeight: "100",
          textDecoration: elem.completed ? "line-through" : "none",
        }}
      >
        {elem.title}
      </Typography>
      <hr
        style={{
          height: "2px",
          border: "0px",
          borderRadius: "25px",
          backgroundColor: "rgba(165, 165, 165, 0.5)",
        }}
      ></hr>
    </Box>
  );
};

export default ToDo;
