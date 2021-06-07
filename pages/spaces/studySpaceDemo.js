import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";



function LinearDeterminate() {
 
  const [progress, setProgress] = React.useState(70);

//   React.useEffect(() => {
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
    <div >
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default function StudySpaceDemo() {
    return (
        <LinearDeterminate/>
    );
}

