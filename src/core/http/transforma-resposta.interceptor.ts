/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/no-empty-function */
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { NestResponse } from './nest-response';
import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter;
    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>{
        return next.handle() //aqui significa requisição siga em frente e atinga o controlador ao qual é o objetivo
                    .pipe(//o pipe permite que os dados sejam manipulados
                        map((respostaDoControlador: NestResponse) => {
                                if (respostaDoControlador instanceof NestResponse) {
                                    const contexto = context.switchToHttp(); //vou pegar o contexto do parametro passado pelo interceptor e mudar para http
                                    const response = contexto.getResponse(); //crio uma constante para armazenar a resposta
                                    const { headers, status, body } = respostaDoControlador; //sabendo que a resposta é do tipo NEstResponse, a resposta obtida é desestruturada conforme a tipagem do nestResponse 

                                    const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);//aqui vou pegar os cabeçalhos:"location" q está no controlador e o caminho/alguma coisa

                                    nomesDosCabecalhos.forEach( nomeDoCabecalho => {
                                        const valorDoCabecalho = headers[nomeDoCabecalho];
                                        this.httpAdapter.setHeader(response, nomeDoCabecalho, valorDoCabecalho);
                                    });

                                    this.httpAdapter.status(response, status);
                                    return body;
                                }
                                return respostaDoControlador;
                            
                            })
                        
                    );
                }
}