import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.model";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }
    createUser(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
    getUserById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }
}
