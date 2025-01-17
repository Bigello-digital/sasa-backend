import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserInterceptor } from 'src/common/interceptors/users.interceptor';


@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get('')
    @Roles(Role.Admin || Role.Superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(UserInterceptor)
    getUsers(@Query() role: Role = Role.User): Promise<User[]> {
        return this.usersService.getUsers(role);

    }

    @Get('/getUser')
    @UseInterceptors(UserInterceptor)
    async getUser(@GetUser() user: User): Promise<User> {
        return this.usersService.getUser(user.id); // Pass the user ID to the service
    }

}
