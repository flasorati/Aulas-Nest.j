/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/ban-types */


import { NestResponse } from "./nest-response";

export class NestResponseBuilder { //essa classe retorna um padrão de resposta para o obj criado c/ base so NestREsponse
    private resposta: NestResponse = {
        status: 200,
        headers: {},
        body: {}
    };

    public comStatus(status: number) {
        this.resposta.status = status;
        return this;
    }

    public comHeaders(headers: Object) {
        this.resposta.headers = headers;
        return this;
    }

    public comBody(body: Object) {
        this.resposta.body = body;
        return this;
    }

    public build(){
        return new NestResponse(this.resposta);
    }
}