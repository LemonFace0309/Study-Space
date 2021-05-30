import React from "react";
import AllOutIcon from "@material-ui/icons/AllOut";
import DoneIcon from "@material-ui/icons/Done";
import EcoIcon from "@material-ui/icons/Eco";
import LockIcon from "@material-ui/icons/Lock";

const FriendCard = (props) => {
  return (
    <div>
      <div class="bg-purple-200 rounded-r-md rounded-b-md">
        <table class="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg divide-y divide-gray-300 overflow-hidden">
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="inline-flex w-10 h-10">
                    <img
                      class="w-10 h-10 object-cover rounded-full"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                    />
                  </div>
                  <div>
                    <p class="">Yi Nan Zhang</p>
                    <p class="text-gray-500 text-xs font-semibold tracking-wide">
                      in study session
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="inline-flex w-10 h-10">
                    <img
                      class="w-10 h-10 object-cover rounded-full"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                    />
                  </div>
                  <div>
                    <p class="">Jimmy Yang</p>
                    <p class="text-gray-500 text-xs font-semibold tracking-wide">
                      in study session
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendCard;
