import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { Persona } from "./persona.model";
import { PersonaDto } from "./dto/persona.dto";
import { PersonaUpdateDto } from "./dto/persona-update.dto";

@Controller("personas")
export class PersonaController {
    constructor(private personasService: PersonaService) {}
    @Get()
    list(): Promise<Persona[]> {
        return this.personasService.findAll();
    }
    @Get(":id")
    get(@Param("id") id: number): Promise<Persona | null> {
        return this.personasService.findById(id);
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
    partialUpdate(@Param("id") id: number, @Body() persona: PersonaUpdateDto): string {
        return "Actualizar parcialmente persona " + id;
    }
    @Delete(":id")
    delete(id: string): string {
        return "Eliminar persona" + id;
    }
}
