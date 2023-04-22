import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function AddColor() {
  const [color, setColor] = useState("");

  const [colorlist, setColorList] = useState(["crimson", "yellowgreen"]);
  return (
    <div className="add-color-div">
      <TextField
        label="Enter a Color"
        variant="outlined"
        onChange={(event) => setColor(event.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => setColorList([...colorlist, color])}
      >
        Add Color
      </Button>
      <div>
        {colorlist.map((clr, i) => (
          <ColorBox key={i} color={clr} />
        ))}
      </div>
    </div>
  );
}
function ColorBox({ color, i }) {
  const styles = {
    background: color,
    width: "500px",
    height: "50px",
    marginTop: "10px",
  };

  return <div className="color-game-div" style={styles}></div>;
}
