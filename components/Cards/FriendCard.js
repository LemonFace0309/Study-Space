import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AllOutIcon from "@material-ui/icons/AllOut";
import DoneIcon from "@material-ui/icons/Done";
import EcoIcon from "@material-ui/icons/Eco";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles({
    box: {
      borderRadius: "0px 15px 15px 0px",
      // HOW TO PUT MATERIAL UI COLORS HERE
      background: "#977BBF",
    },
  }),
  FriendCard = () => {
    const classes = useStyles();
    return (
      <Box className={classes.box}>
        <table class="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg divide-y overflow-hidden">
          <tbody>
            <tr>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="inline-flex w-10 h-10">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="body1"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      Yi Nan Zhang
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      in study session
                    </Typography>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="inline-flex w-10 h-10">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="body1"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      Jimmy Yang
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      in study session
                    </Typography>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    );
  };

export default FriendCard;
