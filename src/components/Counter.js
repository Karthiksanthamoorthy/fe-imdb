import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

export function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const increamentLike = () => setLike(like + 1);
  const increamentDislike =() => setDisLike(disLike + 1);
  return (
    <div>
      <IconButton aria-label="Like" onClick={increamentLike}><ThumbUpRoundedIcon color="primary"/>
      <Badge badgeContent={like} color="primary">
</Badge>
</IconButton>
     
      <IconButton aria-label="DisLike" onClick={increamentDislike}><ThumbDownAltRoundedIcon color="error"/>
      <Badge badgeContent={disLike} color="error">
</Badge>
</IconButton>
     
    </div>
  );
}
