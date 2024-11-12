import { HttpException, HttpStatus, Module } from "@nestjs/common";
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
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: "./uploads", // Directorio donde se guardarán los archivos
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const extension = file.originalname.split(".").pop();
                    //aceptar solo jpg
                    if (extension !== "jpg") {
                        callback(new HttpException("Only jpg files allowed", HttpStatus.BAD_REQUEST), null);
                    }

                    const filename = idSuffix + "." + extension;
                    callback(null, filename);
                },
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "uploads"), // La ruta desde la que se servirán los archivos
            serveRoot: "/uploads", // La ruta desde la que se accederá a los archivos
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
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
