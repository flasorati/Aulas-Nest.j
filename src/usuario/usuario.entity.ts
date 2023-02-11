/* eslint-disable prettier/prettier */
import { Expose, Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "./is-nome-de-usuario-unico.validator";



export class Usuario {
    id: number;

    @Expose({
        name: 'username'
    })
    @IsNomeDeUsuarioUnico({
        message: 'nomeDeUsuario precisa ser único.'
    })
    @IsNotEmpty({
        message: 'nomeDeUsuario é obrigatório.'
    })
    @IsString({
        message: 'nomeDeUsuario precisa ser uma string.'
    })
    nomeDeUsuario: string;

    @Expose({
        name: 'email'
    })
    @IsEmail({}, {
        message: 'email precisa ser um endereço de email válido.'
    })
    email: string;

    @Expose({
        name: 'password'
    })
    @Exclude({
        toPlainOnly: true //somente no momento da serialização, obj js pra obj http(plano) 
    })
    @IsNotEmpty({
        message: 'senha é obrigatória.'
    })
    senha: string;

    @Expose({
        name: 'fullname'
    })
    @IsNotEmpty({
        message: 'nomeCompleto é obrigatório.'
    })
    nomeCompleto: string;
    
    @Expose({ //com o expose, consigo modificar os dados para inglês qdo for serializado p/API e retornar em português
        name: 'joinDate'
    })
    dataDeEntrada: Date;
}

