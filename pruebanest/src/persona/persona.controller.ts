import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { Persona } from "./persona.model";
import { PersonaDto } from "./dto/persona.dto";
import { PersonaUpdateDto } from "./dto/persona-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { promisify } from "util";
import { unlink } from "fs";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
// import { ApiTags } from "@nestjs/swagger";
const unlinkAsync = promisify(unlink);

// @ApiTags("usuarios")
@Controller("personas")
export class PersonaController {
    constructor(private personasService: PersonaService) {}
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    list(): Promise<Persona[]> {
        return this.personasService.findAll();
    }
    @Get(":id")
    async get(@Param("id") id: number): Promise<Persona | null> {
        const personaDB = await this.personasService.findById(id);
        if (!personaDB) {
            throw new NotFoundException();
        }
        return personaDB;
    }
    @Post()
    create(@Body() persona: PersonaDto): Promise<Persona> {
        return this.personasService.createPersona({
            id: 0,
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            edad: persona.edad,
            ciudad: persona.ciudad,
            genero: persona.genero,
            fechaNacimiento: persona.fechaNacimiento,
        });
    }
    @Put(":id")
    async update(@Param("id") id: number, @Body() persona: PersonaDto): Promise<Persona> {
        const personaDB = await this.personasService.findById(id);
        if (!personaDB) {
            throw new NotFoundException();
        }
        return this.personasService.updatePersona({
            id: id,
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            edad: persona.edad,
            ciudad: persona.ciudad,
            genero: persona.genero,
            fechaNacimiento: persona.fechaNacimiento,
        });
    }
    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() persona: PersonaUpdateDto): Promise<Persona> {
        const personaDB = await this.personasService.findById(id);
        if (!personaDB) {
            throw new NotFoundException();
        }
        return this.personasService.updatePersona({
            id: id,
            nombres: persona.nombres ?? personaDB.nombres,
            apellidos: persona.apellidos ?? personaDB.apellidos,
            edad: persona.edad ?? personaDB.edad,
            ciudad: persona.ciudad ?? personaDB.ciudad,
            genero: persona.genero ?? personaDB.genero,
            fechaNacimiento: persona.fechaNacimiento ?? personaDB.fechaNacimiento,
        });
    }
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const personaDB = await this.personasService.findById(id);
        if (!personaDB) {
            throw new NotFoundException();
        }
        return this.personasService.deletePersona(id);
    }

    @Post(":id/profile-picture")
    @UseInterceptors(FileInterceptor("image"))
    async uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const personaDB = await this.personasService.findById(id);
        if (!personaDB) {
            await unlinkAsync(image.path);
            throw new NotFoundException();
        }
        return {
            filename: image.filename,
            path: image.path,
        };
    }
}
