import { NestResponseBuilder } from '../core/http/nest-response-builder';
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { HttpStatus } from '@nestjs/common';
import { NestResponse } from './../core/http/nest-response';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get(':nomeDeUsuario')
  public buscaPorNomeDeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string) {
    const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Usuário não encontrado."
      });
    }
    return usuarioEncontrado;
  }

  @Post()
  public cria(@Body() usuario: Usuario) : NestResponse { //o retorno do usuario precisa ser do tipo nestREsponse
    //assim retornará de forma dinamica o location
    const usuarioCriado = this.usuarioService.cria(usuario);
     return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        'Location': `/users/${usuarioCriado.nomeDeUsuario}`
      })
      .comBody(usuarioCriado)
      .build();
    /* res.status(HttpStatus.CREATED)
      .location(`/users/${usuarioCriado.nomeDeUsuario}`) //aqui é o cabeçario destino para criação
      .json(usuarioCriado);//aqui será enviado o obj json para o cliente->resposta da requisição */
    }
} 
  

