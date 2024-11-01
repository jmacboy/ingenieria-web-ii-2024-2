import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./persona.model";
import { Repository } from "typeorm";

@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Persona)
        private personasRepository: Repository<Persona>,
    ) {}
    findAll(): Promise<Persona[]> {
        return this.personasRepository.find();
    }
    findById(id: number): Promise<Persona | null> {
        return this.personasRepository.findOneBy({ id });
    }
    createPersona(persona: Persona): Promise<Persona> {
        return this.personasRepository.save(persona);
    }
}
