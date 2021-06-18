import React, { useState, useEffect } from "react";

import { LinearProgress } from "@material-ui/core";



export default function ProgressBar() {
  const [progress, setProgress] = useState(70);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((oldProgress) => {
  //         if (oldProgress === 100) {
  //           return 0;
  //         }
  //         const diff = Math.random() * 10;
  //         return Math.min(oldProgress + diff, 100);
  //       });
  //     }, 500);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return (
    <div>
      <LinearProgress color="primary" variant="determinate" value={progress} />
    </div>
  );
}
