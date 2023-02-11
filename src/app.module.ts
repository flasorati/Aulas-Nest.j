import { TransformaRespostaInterceptor } from './core/http/transforma-resposta.interceptor';
/* eslint-disable prettier/prettier */
import { FiltroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-http.filter';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [ 
    {
      provide:APP_FILTER,
      useClass: FiltroDeExcecaoHttp 
    },
    {
      provide: APP_INTERCEPTOR, //aqui será garantido que todas as minhas serializações do APP serão usadas 
      useClass: ClassSerializerInterceptor //esta é classe que vai garantir a tranformação dos dados na validação
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespostaInterceptor
    }
  ],
})
export class AppModule {}
