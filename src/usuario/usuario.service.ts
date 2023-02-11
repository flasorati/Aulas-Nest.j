/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
    //passando um usuario cirado pra poder retornar a busca de teste
    private usuarios = [{
        id: 1,
        nomeDeUsuario: 'Flávia',
        email: 'flasorati@gmail.com',
        senha: '123456',
        nomeCompleto: 'Flávia Sorati de Souza Pereira',
        dataDeEntrada: new Date()
    }];

    public cria(usuario : Usuario) : Usuario {//o usuario criado será tipado e com retorno do tipo usuario
        this.usuarios.push(usuario);
        return usuario;
    }

    public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario{
        return this.usuarios.find(usuario => usuario.nomeDeUsuario == nomeDeUsuario);
    }
}
