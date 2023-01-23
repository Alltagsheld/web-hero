import { createConnection } from "typeorm";
import { convertTypeAcquisitionFromJson } from "typescript";

export const createDBConnection = () => {
  createConnection()
    .then(async () => {
      console.log("Database Connection established");
    })
    .catch((error) => {
      console.log(error);
      console.log("retrying...");
      setTimeout(createConnection, 2000);
    });
};
