/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars *//* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable() //preciso trasnformar essa classe de validação em um provider para ser usada pelo service
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface { //a classe tb precisa ser exportada pra ser usada
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    
    constructor(private usuarioService: UsuarioService) {}
    validate(nomeDeUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);//!! significa que se existir um objeto/nome na base de dados, eu preciso retornar o valor dele que é true, porém se não existir, ele vai retornar false, então eu colocou + ! para inverter o valor para true, liberando o cadastro a ser criado
    }
       
}
    
export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {//validationOptions é a mensagem que está passando
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName, //nomeDoUsuario é a propriedade
        options: validationOptions,
        constraints: [],
        validator: IsNomeDeUsuarioUnicoConstraint,
      });
    };
  }