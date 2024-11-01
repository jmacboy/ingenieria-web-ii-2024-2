import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { Persona } from "./persona.model";
import { PersonaDto } from "./dto/persona.dto";

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
    update(id: string): string {
        return "Actualizar persona " + id;
    }
    @Patch(":id")
    partialUpdate(id: string): string {
        return "Actualizar parcialmente persona " + id;
    }
    @Delete(":id")
    delete(id: string): string {
        return "Eliminar persona" + id;
    }
}
