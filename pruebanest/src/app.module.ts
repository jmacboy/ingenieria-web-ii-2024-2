import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PersonaController } from "./persona/persona.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Persona } from "./persona/persona.model";
import { PersonaService } from "./persona/persona.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.model";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "pruebanest",
            entities: [Persona, User],
            synchronize: true, //solo mientras estén en desarrollo
        }),
        TypeOrmModule.forFeature([Persona]),
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController, PersonaController],
    providers: [AppService, PersonaService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
