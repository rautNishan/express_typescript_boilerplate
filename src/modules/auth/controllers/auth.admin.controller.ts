import { UserLoginDto } from "../dtos/user.login.dto";
import { AuthService } from "../services/auth.service";

export class AuthAdminController {
  private _authService: AuthService;
  constructor() {
    this._authService = AuthService.getInstance();
  }

  async login(data: UserLoginDto) {
    return await this._authService.login(data);
  }
}
