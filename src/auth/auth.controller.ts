import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    //localhost:3000/auth/signup
    @Post('/signup')
    signup(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentialsDto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, message: string }> {
        return this.authService.signIn(authcredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    ho(@Req() req) {
        console.log('req', req)
    }

}
