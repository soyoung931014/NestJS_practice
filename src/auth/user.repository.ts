import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // 솔트만들기
        const hashedPassword = await bcrypt.hash(password, salt); // 솔트랑 패스워드랑 해시

        const user = this.create({
            username,
            password: hashedPassword
        })
        try {
            await this.save(user)
        } catch (error) {
            //console.log(error, 'error')
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}