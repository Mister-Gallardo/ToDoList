import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import "../App.css";
import { useEffect, useState } from "react";
import ToDo from "../components/ToDo";
import EmptyLine from "../components/EmptyLine";

// этот код можно, конечно, тоже разделить по файлам,
// но... не вижу в этом большого смысла :/

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

const ToDoApp: React.FC = () => {
  const [list, setList] = useState<ToDoItem[]>([
    { id: 1, title: "Тестовое задание", completed: false },
    { id: 2, title: "Прекрасный код", completed: false },
    { id: 3, title: "Покрытый тестами", completed: false },
  ]);
  const [active, setActive] = useState(list.filter((elem) => !elem.completed));
  const [completed, setCompleted] = useState(
    list.filter((elem) => elem.completed)
  );

  const [toDoValue, setToDoValue] = useState("");
  const [type, setType] = useState<"All" | "Active" | "Completed">("All");

  function AddToDo(toDo: ToDoItem) {
    if (toDoValue) {
      setList([...list, toDo]);
      setToDoValue("");
    } else {
      alert("Введите значение!");
    }
  }

  function SetCompleted(id: number) {
    setList(
      list.map((elem) => {
        if (elem.id === id) {
          elem.completed = !elem.completed;
        }
        return elem;
      })
    );
  }

  function ClearCompleted() {
    setList(list.filter((elem) => elem.completed === false));
  }

  useEffect(() => {
    setActive(list.filter((elem) => elem.completed === false));
    setCompleted(list.filter((elem) => elem.completed === true));
  }, [list]);

  return (
    <Box
      sx={{
        margin: "3vw auto",
        width: "70vw",
        minWidth: "310px",
        padding: "10px 0px 20px",
        borderRadius: "15px",
        backgroundColor: "rgb(240, 240, 240)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Open Sans",
          fontSize: "70px",
          fontWeight: "100",
          color: "rgba(177, 82, 72, 0.550)",
        }}
      >
        todos
      </Typography>
      <Box
        sx={{
          width: "92%",
          padding: "12px 15px",
          borderRadius: "12px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            paddingLeft: "15px",
            borderBottom: "3px solid rgba(165, 165, 165, 0.5)",
          }}
        >
          <IconButton
            data-testid="add-btn"
            onClick={() =>
              AddToDo({
                id: list.length + 1,
                title: toDoValue,
                completed: false,
              })
            }
          >
            <AddCircleIcon color="warning" sx={{ fontSize: "32px" }} />
          </IconButton>
          <TextField
            inputProps={{
              "data-testid": "add-input",
            }}
            value={toDoValue}
            variant="standard"
            label="What needs to be done?"
            fullWidth
            onChange={(e) => setToDoValue(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" &&
                AddToDo({
                  id: list.length + 1,
                  title: toDoValue,
                  completed: false,
                });
            }}
          ></TextField>
        </Box>
        <Box>
          {list.length === 0 ? (
            <EmptyLine />
          ) : type === "All" ? (
            list.map((elem: ToDoItem) => (
              <ToDo key={elem.id} elem={elem} SetCompleted={SetCompleted} />
            ))
          ) : active.length === 0 && type !== "Completed" ? (
            <EmptyLine />
          ) : type === "Active" ? (
            active.map((elem: ToDoItem) => (
              <ToDo key={elem.id} elem={elem} SetCompleted={SetCompleted} />
            ))
          ) : completed.length === 0 ? (
            <EmptyLine />
          ) : (
            completed.map((elem: ToDoItem) => (
              <ToDo key={elem.id} elem={elem} SetCompleted={SetCompleted} />
            ))
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 15px 0px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "rgb(130 130 130)",
              fontWeight: "400",
            }}
          >
            {list.length} items left
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Button
              sx={{
                padding: "0px 8px",
                minWidth: "0",
                textTransform: "none",
                color: "rgb(130 130 130)",
                fontWeight: "400",
                border:
                  type === "All" ? "2px solid rgba(177, 82, 72, 0.8)" : "none",
              }}
              onClick={() => setType("All")}
            >
              All
            </Button>
            <Button
              sx={{
                padding: "0px 8px",
                minWidth: "0",
                textTransform: "none",
                color: "rgb(130 130 130)",
                fontWeight: "400",
                border:
                  type === "Active"
                    ? "2px solid rgba(177, 82, 72, 0.8)"
                    : "none",
              }}
              onClick={() => setType("Active")}
            >
              Active
            </Button>
            <Button
              sx={{
                padding: "0px 8px",
                minWidth: "0",
                textTransform: "none",
                color: "rgb(130 130 130)",
                fontWeight: "400",
                border:
                  type === "Completed"
                    ? "2px solid rgba(177, 82, 72, 0.8)"
                    : "none",
              }}
              onClick={() => setType("Completed")}
            >
              Completed
            </Button>
          </Box>
          <Button
            sx={{
              padding: "0px 3px",
              textTransform: "none",
              color: "rgb(130 130 130)",
              fontWeight: "400",
            }}
            onClick={ClearCompleted}
          >
            Clear completed
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ToDoApp;
