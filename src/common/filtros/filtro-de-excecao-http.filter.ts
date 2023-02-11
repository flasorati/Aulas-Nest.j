/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost, AbstractHttpAdapter } from "@nestjs/core";

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {
    
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
       this.httpAdapter = adapterHost.httpAdapter; //para lidar fom fastfy ou express
    }
    catch(exception: Error, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const requisicao = contexto.getRequest();
        const resposta = contexto.getResponse();

        const { status, body } = exception instanceof HttpException
            ? { //caso a excecao seja do tipo http exception
                status:exception.getStatus(),
                body:exception.getResponse()
            }
            : {//se não for, retorna isso
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {//as informações que serão serializadas serão do tipo abaixo
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(), 
                    message: exception.message,
                    path: requisicao.path //assim consigo obter o caminho da requisição
                }
            };
        this.httpAdapter.reply(resposta, body, status); //retornando a resposta

    }
}