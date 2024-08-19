import { UserService } from "../../../../modules/users/services/user.service";
import { USER_ROLE } from "../../../constants/roles.constant";
import { DBConnection } from "../../connection/database.connection";

export async function seedAdmin() {
  await DBConnection.connection();
  const userService = UserService.getInstance();
  const existingAdmin = await userService.getAll({
    options: { where: { userName: "admin" } },
  });
  if (existingAdmin.data.length > 0) {
    for (let data of existingAdmin.data) {
      await userService.hardDelete(data);
    }
  }
  await userService.create({
    userName: "admin",
    email: "admin@gmail.com",
    role: USER_ROLE.ADMIN,
    password: "admin",
  });
  await DBConnection.closeConnection();
}

seedAdmin()
  .then(() => console.log("AdminSeed Success"))
  .catch((error) => console.log("Something went wrong: ", error));
